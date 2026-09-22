import "./style.css";
import {
  ENDPOINT,
  MODEL,
  applicationRule,
  decide,
  keySupplied,
  redact,
  type RequestBody,
  type ResponseBody,
} from "./core.ts";
import { presets, localizedPresets, type PresetId } from "./presets.ts";
import { translate, type Language } from "./i18n.ts";
let language: Language = "en";
const t = (text: string) => translate(text, language);
const root = document.querySelector<HTMLDivElement>("#app")!;
root.innerHTML = `<header>
  <a class="brand" href="./" aria-label="Jev Decision Lab home"><span class="brand-mark" aria-hidden="true">j.</span><h1>Jev <span>Decision Lab</span></h1></a>
  <div class="language-switch" role="group" aria-label="Language / Bahasa"><button type="button" data-language="en" lang="en" aria-label="English" aria-pressed="true">EN</button><button type="button" data-language="id" lang="id" aria-label="Bahasa Indonesia" aria-pressed="false">ID</button></div>
  <div class="key-control" id="key-control">
    <label for="api-key">OpenRouter key</label>
    <div class="key-field"><input id="api-key" type="password" placeholder="sk-or-v1-…" aria-label="OpenRouter API key" autocomplete="off" autocapitalize="off" spellcheck="false" aria-describedby="key-note key-status"><span class="dot" aria-hidden="true"></span></div>
    <button id="clear-key" class="quiet-button" type="button">Clear</button>
    <span class="key-status" id="key-status" aria-live="polite">Key required</span>
  </div>
</header>
<div class="notice" id="key-note"><strong>Runtime only. Never saved.</strong> Your key goes directly to OpenRouter, stays out of storage and logs, and clears on reload. <span>Green means supplied, not validated.</span></div>
<main>
  <div class="column">
    <div class="column-heading"><span class="step-number">01</span><div><h2>Configure</h2><p class="sub">Give Jev something to decide.</p></div></div>
    <section>
      <label for="preset">Start with an example</label>
      <select id="preset">${Object.entries(presets)
        .map(([id, p]) => `<option value="${id}">${p.name}</option>`)
        .join("")}</select>
      <div id="language-note" class="sub" role="status" hidden></div><button type="button" id="reload-example" class="quiet-button" hidden>Reload example</button>
      <label for="input" class="spaced-label">Input state</label><textarea id="input" rows="4" aria-describedby="input-help"></textarea>
      <p class="sub" id="input-help">This text is shared with all three questions.</p>
    </section>
    <section class="questions-panel"><div class="section-heading"><h3>Three focused questions</h3><span class="badge">Editable</span></div>
      <details class="question" open><summary><span class="kind">Choice</span><span id="choice-summary">Choose one option</span></summary><div class="question-editor">
        <label for="choice">Question</label><textarea id="choice" rows="2"></textarea>
        <label for="options">Options <span class="sub">· one per line</span></label><textarea id="options" rows="3"></textarea>
      </div></details>
      <details class="question"><summary><span class="kind">Score</span><span id="score-summary">Rate on a rubric</span></summary><div class="question-editor">
        <label for="score">Question</label><textarea id="score" rows="2"></textarea>
        <label for="levels">Rubric <span class="sub">· lowest to highest, one per line</span></label><textarea id="levels" rows="3"></textarea>
        <p class="sub">Levels start at 0. The returned score can fall between levels.</p>
      </div></details>
      <details class="question"><summary><span class="kind">Noul</span><span id="noul-summary">Check a statement</span></summary><div class="question-editor">
        <label for="noul">Yes / no question</label><textarea id="noul" rows="2"></textarea><p class="sub">Returns a probability from 0 (no) to 1 (yes).</p>
      </div></details>
    </section>
    <section><div class="section-heading"><h3>Routing threshold</h3><output id="threshold-value" for="threshold"></output></div>
      <label for="threshold">Minimum choice confidence</label><input id="threshold" type="range" min="0" max="1" step="0.01" value="0.68">
      <div class="range-labels"><span>More automatic routes</span><span>More human review</span></div>
      <p class="sub">Adjust freely. This rule runs locally without another API call.</p><details><summary>See the rule</summary><pre id="rule"></pre></details>
    </section>
  </div>
  <div class="column request-column">
    <div class="column-heading"><span class="step-number">02</span><div><h2>Inspect & run</h2><p class="sub">Exactly what goes to the model.</p></div></div>
    <section class="request-panel">
      <div class="section-heading"><h3>Jev 1.13</h3><span class="badge">Via OpenRouter</span></div>
      <div class="endpoint"><span>POST</span><code>${ENDPOINT}</code></div>
      <button id="run" class="run" type="button" disabled>Run decision <span aria-hidden="true">↗</span></button><button id="cancel" type="button" hidden>Cancel request</button>
      <p id="run-help" class="sub">Add your OpenRouter key to run. Each run uses your OpenRouter credits.</p>
      <div id="validation" class="error" hidden role="alert"></div>
      <div class="code-heading"><span>REQUEST BODY</span><button id="copy-request" type="button" class="copy-button">Copy JSON</button></div>
      <pre id="request" class="request-code" aria-label="Exact JSON request body for next run"></pre>
      <p class="sub request-footnote">Your key is sent in the authorization header, never in this JSON.</p><span id="copy-status" class="sub" role="status"></span>
    </section>
  </div>
  <div class="column output-column">
    <div class="column-heading"><span class="step-number">03</span><div><h2>Understand</h2><p class="sub">Model judgment, then your rule.</p></div></div>
    <section class="response-panel"><div class="section-heading"><h3>Model response</h3><span class="badge" id="result-badge">Ready when you are</span></div>
      <div id="status" class="sub" role="status">Choose an example, add your key, and run a decision.</div>
      <div id="empty-state"><span class="empty-symbol" aria-hidden="true">{ }</span><p>Small questions.<br>Decisions you can inspect.</p><span class="sub">Choice · Score · Noul</span></div>
      <p id="stale" class="stale" hidden>Inputs changed. These results belong to the captured request below.</p>
      <div id="error" class="error" hidden role="alert"></div><div id="results"></div>
      <details id="raw-details" hidden><summary>Full response JSON</summary><pre id="raw"></pre></details>
      <details id="snapshot-details" hidden><summary>Original request for this result</summary><pre id="snapshot"></pre></details>
    </section>
    <section><div class="section-heading"><h3>Your application’s decision</h3><span class="badge">Local rule</span></div><div class="route" id="route"><span class="sub">Proposed route</span><strong id="action">Waiting for Jev</strong><div class="sub" id="reason">The choice and confidence will determine the route.</div></div><p class="sub">An explanation of what your code would do. No downstream action is executed.</p></section>
  </div>
</main>
<footer><span>Built for learning. Independent of TypeSafe and OpenRouter.</span><div><a href="https://github.com/yusufsiregar44/jev-decision-lab" target="_blank" rel="noreferrer">Source on GitHub ↗</a><a href="https://docs.typesafe.ai/introduction" target="_blank" rel="noreferrer">Jev docs ↗</a><a href="https://openrouter.ai/labs/jev/compile" target="_blank" rel="noreferrer">API example ↗</a></div></footer>
`;
// Bind only interface copy once. Never translate entered text, JSON, or model output.
const copyBindings: { node: Text; original: string }[] = [];
const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode as Text;
  if (
    node.textContent?.trim() &&
    !node.parentElement?.closest(
      "pre, code, textarea, select, .brand, .language-switch, #results",
    )
  ) {
    copyBindings.push({ node, original: node.textContent });
  }
}
const attributeBindings = Array.from(
  root.querySelectorAll<HTMLElement>("[aria-label]"),
)
  .filter((node) => !node.closest(".language-switch"))
  .map((node) => ({ node, original: node.getAttribute("aria-label")! }));
function localizeStaticCopy() {
  document.documentElement.lang = language;
  for (const { node, original } of copyBindings) {
    node.textContent = original.replace(original.trim(), t(original.trim()));
  }
  for (const { node, original } of attributeBindings)
    node.setAttribute("aria-label", t(original));
  document
    .querySelectorAll<HTMLButtonElement>("[data-language]")
    .forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.language === language),
      );
    });
  Object.entries(localizedPresets[language]).forEach(([id, preset]) => {
    const option = document.querySelector<HTMLOptionElement>(
      `#preset option[value="${id}"]`,
    );
    if (option) option.textContent = preset.name;
  });
}
const el = <T extends HTMLElement = HTMLElement>(id: string) =>
  document.getElementById(id) as T;
const field = (id: string) =>
  el<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(id);
let controller: AbortController | null = null;
let result: ResponseBody | null = null;
let snapshot: RequestBody | null = null;
let runState: "idle" | "running" | "success" | "failed" = "idle";
let responseMeta: { status: number; seconds: string } | null = null;
let errorDetail = "";
let cancelled = false;
let copyState: "idle" | "copied" | "failed" = "idle";
let editsPreserved = false;
function activity() {
  el("status").textContent =
    runState === "running"
      ? t("Sending request to OpenRouter…")
      : runState === "success" && responseMeta
        ? `HTTP ${responseMeta.status} · ${responseMeta.seconds} ${t("s round trip")}`
        : runState === "failed"
          ? t(
              result
                ? "Previous successful result retained below."
                : "No response available.",
            )
          : t("Choose an example, add your key, and run a decision.");
  el("result-badge").textContent = t(
    runState === "running"
      ? "Running"
      : runState === "success"
        ? "Live result"
        : runState === "failed"
          ? result
            ? "Previous result"
            : "Failed"
          : "Ready when you are",
  );
  el("error").textContent = cancelled
    ? t(
        "Request cancelled or timed out. OpenRouter may already have processed it.",
      )
    : errorDetail
      ? `${t("Request failed. Details:")} ${t(errorDetail)}`
      : "";
  el("copy-status").textContent =
    copyState === "copied"
      ? t("Request JSON copied. No authorization key included.")
      : copyState === "failed"
        ? t("Clipboard unavailable. Select the request text to copy it.")
        : "";
  el("language-note").hidden = !editsPreserved;
  el("reload-example").hidden = !editsPreserved;
  el("language-note").textContent = t(
    "Your edits are unchanged. Reload the example to use this language; this replaces the current input and questions.",
  );
}
const json = (v: unknown) => JSON.stringify(v, null, 2);
const lines = (id: string) =>
  field(id)
    .value.split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
function request(): RequestBody {
  return {
    model: MODEL,
    state: { text: field("input").value },
    questions: {
      choice: {
        type: "choice",
        instructions: field("choice").value,
        criteria: Object.fromEntries(lines("options").map((s) => [s, null])),
      },
      rating: {
        type: "score",
        instructions: field("score").value,
        criteria: lines("levels"),
      },
      check: { type: "noul", instructions: field("noul").value },
    },
  };
}
function validation() {
  if (!field("input").value.trim()) return t("Enter input text.");
  if (["choice", "score", "noul"].some((id) => !field(id).value.trim()))
    return t("Fill in all three questions.");
  if (lines("options").length < 2) return t("Add at least two choice options.");
  if (new Set(lines("options")).size !== lines("options").length)
    return t("Choice options must be unique.");
  if (lines("levels").length < 2) return t("Add at least two rubric levels.");
  return "";
}
function update() {
  const key = field("api-key").value;
  const supplied = keySupplied(key);
  el("key-control").classList.toggle("ready", supplied);
  el("key-status").textContent = supplied
    ? t("Key supplied")
    : t("Key required");
  const issue = validation();
  el<HTMLButtonElement>("run").disabled = !supplied || !!controller || !!issue;
  el("validation").hidden = !issue;
  el("validation").textContent = issue;
  el("request").textContent = redact(json(request()), key);
  el("choice-summary").textContent =
    field("choice").value || t("Choose one option");
  el("score-summary").textContent =
    field("score").value || t("Rate on a rubric");
  el("noul-summary").textContent =
    field("noul").value || t("Check a statement");
  el("run").textContent = controller
    ? t("Running decision…")
    : `${t("Run decision")} ↗`;
  el("run-help").textContent = !supplied
    ? t(
        "Add your OpenRouter key to run. Each run uses your OpenRouter credits.",
      )
    : t(
        "Each run sends the displayed request and uses your OpenRouter credits.",
      );
  copyState = "idle";
  activity();
  el("stale").hidden = !snapshot || json(snapshot) === json(request());
}
function rule() {
  const threshold = Number(field("threshold").value);
  el("threshold-value").textContent = threshold.toFixed(2);
  el("rule").textContent =
    `if valid choice.confidence >= ${threshold.toFixed(2)}:\n    propose_route(choice)\nelse:\n    human_review()`;
  if (result) {
    const decision = applicationRule(
      result.answers.choice,
      threshold,
      Object.keys(
        (snapshot?.questions.choice as { criteria: Record<string, unknown> })
          ?.criteria ?? {},
      ),
    );
    el("action").textContent =
      decision.action === "Human review" ? t("Human review") : decision.action;
    el("reason").textContent = decision.reason.startsWith("Confidence ")
      ? `${t("Confidence")}: ${(result.answers.choice as { confidence: number }).confidence.toFixed(2)} ${t(decision.action === "Human review" ? "is below threshold" : "meets threshold")} ${threshold.toFixed(2)}.`
      : t(decision.reason);
    el("route").classList.toggle("review", decision.action === "Human review");
  } else {
    el("action").textContent = t("Waiting for Jev");
    el("reason").textContent = t(
      "The choice and confidence will determine the route.",
    );
  }
}
function renderResults() {
  const target = el("results");
  target.replaceChildren();
  if (!result) return;
  const metadata = document.createElement("p");
  metadata.className = "response-meta";
  const usage = result.usage as Record<string, unknown> | undefined;
  metadata.textContent = [
    result.model && `Model: ${result.model}`,
    result.provider && `${t("Provider")}: ${result.provider}`,
    usage?.input_tokens !== undefined &&
      `${t("Input tokens")}: ${usage.input_tokens}`,
    usage?.output_tokens !== undefined &&
      `${t("Output tokens")}: ${usage.output_tokens}`,
    usage?.cost !== undefined && `${t("Cost")}: $${usage.cost}`,
  ]
    .filter(Boolean)
    .join(" · ");
  target.append(metadata);
  for (const [id, answer] of Object.entries(result.answers)) {
    const box = document.createElement("div");
    box.className = "answer";
    const label = document.createElement("div");
    label.className = "sub";
    label.textContent =
      answer.type === "choice"
        ? t("CHOICE · Selected option")
        : answer.type === "score"
          ? t("SCORE · Rubric rating")
          : t("NOUL · Probability of yes");
    const question = document.createElement("p");
    question.className = "answer-question";
    const definition = snapshot?.questions[id] as
      | { instructions?: unknown }
      | undefined;
    question.textContent =
      typeof definition?.instructions === "string"
        ? definition.instructions
        : id;
    box.append(question);
    box.append(label);
    const value = document.createElement("strong");
    value.textContent =
      answer.type === "choice"
        ? answer.choice
        : answer.type === "score"
          ? String(answer.score)
          : `${(answer.noul * 100).toFixed(1)}%`;
    box.append(value);
    if (answer.type === "score") {
      const rubric = document.createElement("p");
      rubric.className = "sub";
      const criteria = (snapshot?.questions[id] as { criteria?: unknown })
        ?.criteria;
      rubric.textContent = Array.isArray(criteria)
        ? `${t("Rubric")}: ${criteria.map((v, i) => `${i} = ${v}`).join(" · ")}`
        : t("Rubric unavailable");
      box.append(rubric);
    }
    if (answer.type === "choice" || answer.type === "score") {
      const confidence = document.createElement("div");
      confidence.className = "sub";
      confidence.textContent = `${t("Confidence")}: ${answer.confidence ?? t("not supplied")}`;
      box.append(confidence);
      if (answer.probabilities && typeof answer.probabilities === "object")
        for (const [name, prob] of Object.entries(answer.probabilities)) {
          const row = document.createElement("div");
          row.className = "metric";
          const rubric = (snapshot?.questions[id] as { criteria?: unknown })
            ?.criteria;
          const displayName =
            answer.type === "score" && Array.isArray(rubric)
              ? `${name} · ${rubric[Number(name)] ?? name}`
              : name;
          const optionLabel = document.createElement("span");
          optionLabel.textContent = displayName;
          const probability = document.createElement("span");
          probability.textContent =
            typeof prob === "number"
              ? `${(prob * 100).toFixed(1)}%`
              : String(prob);
          row.append(optionLabel, probability);
          box.append(row);
          if (
            typeof prob === "number" &&
            Number.isFinite(prob) &&
            prob >= 0 &&
            prob <= 1
          ) {
            const track = document.createElement("div");
            track.className = "track";
            const fill = document.createElement("div");
            fill.className = "fill";
            fill.style.width = `${prob * 100}%`;
            track.append(fill);
            box.append(track);
          }
        }
    }
    target.append(box);
  }
  rule();
}
function loadPreset() {
  const p = localizedPresets[language][field("preset").value as PresetId];
  editsPreserved = false;
  field("input").value = p.text;
  field("choice").value = p.choice;
  field("options").value = p.options.join("\n");
  field("score").value = p.score;
  field("levels").value = p.levels.join("\n");
  field("noul").value = p.noul;
  update();
}
field("preset").addEventListener("change", loadPreset);
el("reload-example").addEventListener("click", loadPreset);
function switchLanguage(next: Language) {
  if (next === language) return;
  const previous =
    localizedPresets[language][field("preset").value as PresetId];
  const original = {
    input: previous.text,
    choice: previous.choice,
    options: previous.options.join("\n"),
    score: previous.score,
    levels: previous.levels.join("\n"),
    noul: previous.noul,
  };
  const untouched = Object.entries(original).every(
    ([id, value]) => field(id).value === value,
  );
  language = next;
  localizeStaticCopy();
  // Keep edited business text intact; changing UI language is not a translation API call.
  if (untouched) loadPreset();
  else {
    editsPreserved = true;
    update();
  }
  if (result) renderResults();
  rule();
  activity();
}
root
  .querySelectorAll<HTMLButtonElement>("[data-language]")
  .forEach((button) => {
    button.addEventListener("click", () =>
      switchLanguage(button.dataset.language as Language),
    );
  });
el("copy-request").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(el("request").textContent ?? "");
    copyState = "copied";
    activity();
  } catch {
    copyState = "failed";
    activity();
  }
});
for (const id of [
  "input",
  "choice",
  "options",
  "score",
  "levels",
  "noul",
  "api-key",
])
  field(id).addEventListener("input", update);
field("threshold").addEventListener("input", rule);
function clearKey() {
  controller?.abort();
  field("api-key").value = "";
  update();
}
el("clear-key").addEventListener("click", () => {
  clearKey();
  field("api-key").focus();
});
window.addEventListener("pagehide", clearKey);
el("cancel").addEventListener("click", () => controller?.abort());
el("run").addEventListener("click", async () => {
  if (controller || validation() || !keySupplied(field("api-key").value))
    return;
  const body = request();
  let key = field("api-key").value.trim();
  controller = new AbortController();
  const started = performance.now();
  const timeout = window.setTimeout(() => controller?.abort(), 90000);
  el("cancel").hidden = false;
  el("error").hidden = true;
  runState = "running";
  errorDetail = "";
  cancelled = false;
  activity();
  el("empty-state").hidden = true;
  el("results").setAttribute("aria-busy", "true");
  update();
  try {
    const response = await decide(body, key, controller.signal);
    result = response.data;
    snapshot = body;
    el("raw").textContent = json(result);
    el("snapshot").textContent = redact(json(body), key);
    el("raw-details").hidden = false;
    el("snapshot-details").hidden = false;
    runState = "success";
    responseMeta = {
      status: response.status,
      seconds: ((performance.now() - started) / 1000).toFixed(2),
    };
    activity();
    renderResults();
  } catch (error) {
    el("error").hidden = false;
    cancelled = controller.signal.aborted;
    errorDetail = redact(
      error instanceof Error ? error.message : String(error),
      key,
    );
    runState = "failed";
    activity();
  } finally {
    key = "";
    window.clearTimeout(timeout);
    controller = null;
    el("cancel").hidden = true;
    el("results").setAttribute("aria-busy", "false");
    update();
  }
});
localizeStaticCopy();
loadPreset();
rule();
