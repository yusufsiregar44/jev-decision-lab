export const ENDPOINT = "https://openrouter.ai/api/alpha/decisions";
export const MODEL = "typesafe/jev-1.13";
export type RequestBody = {
  model: string;
  state: { text: string };
  questions: Record<string, unknown>;
};
export type Choice = {
  type: "choice";
  choice: string;
  confidence?: number;
  probabilities?: Record<string, number>;
};
export type Answer =
  | Choice
  | {
      type: "score";
      score: number;
      confidence?: number;
      probabilities?: Record<string, number>;
      legend?: unknown;
    }
  | { type: "noul"; noul: number };
export type ResponseBody = {
  answers: Record<string, Answer>;
  [key: string]: unknown;
};
export function keySupplied(key: string) {
  return key.trim().length > 0;
}
export function redact(value: string, key: string) {
  return key.trim() ? value.split(key.trim()).join("[REDACTED]") : value;
}
export function validateResponse(value: unknown): ResponseBody {
  if (
    !value ||
    typeof value !== "object" ||
    !("answers" in value) ||
    !value.answers ||
    typeof value.answers !== "object" ||
    Array.isArray(value.answers)
  )
    throw new Error("Response did not contain an answers object.");
  for (const answer of Object.values(value.answers)) {
    if (!answer || typeof answer !== "object")
      throw new Error("Response contained an invalid answer.");
    if (answer.type === "choice" && typeof answer.choice === "string") continue;
    if (
      answer.type === "score" &&
      typeof answer.score === "number" &&
      Number.isFinite(answer.score)
    )
      continue;
    if (
      answer.type === "noul" &&
      typeof answer.noul === "number" &&
      answer.noul >= 0 &&
      answer.noul <= 1
    )
      continue;
    throw new Error("Response contained an unsupported or invalid answer.");
  }
  return value as ResponseBody;
}
export function applicationRule(
  answer: Answer | undefined,
  threshold: number,
  allowedChoices?: string[],
) {
  if (!answer || answer.type !== "choice" || typeof answer.choice !== "string")
    return { action: "Human review", reason: "No usable choice returned." };
  if (allowedChoices && !allowedChoices.includes(answer.choice))
    return {
      action: "Human review",
      reason: "Returned choice is not an option in the captured request.",
    };
  if (
    typeof answer.confidence !== "number" ||
    !Number.isFinite(answer.confidence) ||
    answer.confidence < 0 ||
    answer.confidence > 1
  )
    return {
      action: "Human review",
      reason:
        "Choice confidence was not returned as a valid 0–1 confidence value. No confidence was inferred.",
    };
  return answer.confidence >= threshold
    ? {
        action: answer.choice,
        reason: `Confidence ${answer.confidence.toFixed(2)} meets threshold ${threshold.toFixed(2)}.`,
      }
    : {
        action: "Human review",
        reason: `Confidence ${answer.confidence.toFixed(2)} is below threshold ${threshold.toFixed(2)}.`,
      };
}
export async function decide(
  body: RequestBody,
  key: string,
  signal: AbortSignal,
  fetcher: typeof fetch = fetch,
) {
  if (!keySupplied(key)) throw new Error("Supply an OpenRouter API key first.");
  const response = await fetcher(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key.trim()}`,
    },
    body: JSON.stringify(body),
    signal,
    credentials: "omit",
    redirect: "error",
    cache: "no-store",
  });
  const raw = redact(await response.text(), key);
  if (!response.ok)
    throw new Error(
      `HTTP ${response.status}: ${raw.slice(0, 4000) || response.statusText}`,
    );
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("OpenRouter returned a non-JSON response.");
  }
  return { data: validateResponse(data), status: response.status };
}
