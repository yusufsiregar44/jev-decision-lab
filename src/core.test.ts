import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applicationRule,
  decide,
  ENDPOINT,
  keySupplied,
  redact,
  type RequestBody,
} from "./core.ts";
const body: RequestBody = {
  model: "typesafe/jev-1.13",
  state: { text: "test" },
  questions: {},
};
test("key presence trims whitespace and redaction removes every occurrence", () => {
  assert.equal(keySupplied("   "), false);
  assert.equal(keySupplied("sk-test"), true);
  assert.equal(redact("sk-test/sk-test", "sk-test"), "[REDACTED]/[REDACTED]");
});
test("rule honors threshold boundaries and missing confidence needs review", () => {
  assert.equal(
    applicationRule(
      { type: "choice", choice: "billing", confidence: 0.68 },
      0.68,
    ).action,
    "billing",
  );
  assert.equal(
    applicationRule(
      { type: "choice", choice: "billing", confidence: 0.68 },
      0.69,
    ).action,
    "Human review",
  );
  assert.equal(
    applicationRule(
      { type: "choice", choice: "billing", probabilities: { billing: 0.99 } },
      0.68,
    ).action,
    "Human review",
  );
});
test("adapter puts credentials only in Authorization and retains fractional scores", async () => {
  let calls = 0;
  const mock: typeof fetch = async (url, options) => {
    calls++;
    assert.equal(url, ENDPOINT);
    assert.equal(
      (options?.headers as Record<string, string>).Authorization,
      "Bearer sk-test",
    );
    assert.equal(options?.credentials, "omit");
    assert.equal(options?.redirect, "error");
    assert.ok(!String(options?.body).includes("sk-test"));
    return new Response(
      JSON.stringify({ answers: { rating: { type: "score", score: 1.43 } } }),
      { status: 200 },
    );
  };
  const result = await decide(
    body,
    "sk-test",
    new AbortController().signal,
    mock,
  );
  assert.equal(result.data.answers.rating.type, "score");
  assert.equal(calls, 1);
});
test("adapter refuses empty key before network and redacts server errors", async () => {
  let called = false;
  await assert.rejects(
    decide(body, " ", new AbortController().signal, async () => {
      called = true;
      return new Response();
    }),
  );
  assert.equal(called, false);
  await assert.rejects(
    decide(
      body,
      "sk-test",
      new AbortController().signal,
      async () => new Response("bad sk-test", { status: 401 }),
    ),
    /HTTP 401: bad \[REDACTED\]/,
  );
});
test("adapter rejects malformed success payload", async () => {
  await assert.rejects(
    decide(
      body,
      "sk-test",
      new AbortController().signal,
      async () => new Response("{}"),
    ),
    /answers object/,
  );
});
test("unknown choices cannot trigger a proposed route", () => {
  assert.equal(
    applicationRule(
      { type: "choice", choice: "unexpected", confidence: 0.99 },
      0.68,
      ["billing"],
    ).action,
    "Human review",
  );
});
test("adapter rejects malformed answers and arrays", async () => {
  for (const data of [
    { answers: [] },
    { answers: { choice: null } },
    { answers: { choice: { type: "choice", choice: 42 } } },
    { answers: { check: { type: "noul", noul: 3 } } },
  ]) {
    await assert.rejects(
      decide(
        body,
        "sk-test",
        new AbortController().signal,
        async () => new Response(JSON.stringify(data)),
      ),
    );
  }
});
