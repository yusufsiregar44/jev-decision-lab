# Jev Decision Lab

A small browser app for learning Jev's typed decisions through OpenRouter. Edit input and questions on the left, inspect and send the exact request in the middle, then examine the model output and application rule on the right.

Built with TypeScript and Vite. No application backend, database, or saved credentials. An independent learning project, not affiliated with TypeSafe or OpenRouter.

## Run locally

Requires Node.js 22.18+ and npm.

```sh
git clone https://github.com/yusufsiregar44/jev-decision-lab.git
cd jev-decision-lab
npm ci
npm run dev
```

Open the localhost URL printed by Vite. Enter an OpenRouter key (`sk-or-v1-…`) in the masked header field. Green means a key was supplied, not validated. **Run decision** makes a real, potentially billable API call; the app does not display simulated results as live output.

## Language / Bahasa

Use **EN / ID** in the header to switch the interface and built-in examples. Indonesian uses everyday business language. The switch keeps the runtime key, threshold, and existing results intact; it makes no API call. Edited input and questions are preserved, with an explicit **Reload example / Muat ulang contoh** action if you want to replace them with the selected language's example.

Raw API requests, responses, model identifiers, and captured results keep their original values. Language selection lasts for the current page session; nothing is written to browser storage.

## Try it

- **Support triage:** choose a team, score urgency, and assess whether account access is blocked.
- **Research relevance:** classify a supplied excerpt and evaluate its relevance.
- **Request routing:** propose a tool without actually invoking it.

Expand a question to edit its wording, choice options, or score rubric. Use **Copy JSON** to copy the request body without the authorization key. Inspect the request before running it, then compare the readable answers with the full response JSON and captured request. Changing inputs leaves the earlier result tied to its snapshot.

Move the confidence threshold to recompute the proposed route locally—no new API call. Missing or invalid choice confidence, or an unexpected choice, goes to human review. A Score can be fractional because it is a weighted rubric index. Confidence is not a measured probability of correctness. See [LEARNINGS.md](LEARNINGS.md).

## Runtime key boundary

The key stays in the password field and temporary request memory. It is sent directly to OpenRouter as the Authorization header at `https://openrouter.ai/api/alpha/decisions`. The app uses no browser storage, cookies, service worker, analytics, or credential persistence. Clear removes the key and aborts the current request; reloading resets the app. Request previews omit credentials, and response/error text redacts the supplied key.

Runtime-only does not make the key invisible: the browser user, extensions, developer tools, and OpenRouter can access it. Use a trusted browser and host. Input text and questions are sent to OpenRouter too; do not put secrets in them. Cancellation or a timeout cannot guarantee that an already-sent call will not be processed or charged.

## Checks and build

```sh
npm test
npm run build
npm run preview
```

CI runs install, tests, and build on Node.js 22. Tests use synthetic responses and need no key. Browser checks covered key gating and redaction, request snapshots, fractional scores, local threshold changes, cancellation, and narrow layouts. Separately, one real call through the user UI returned model `typesafe/jev-1.13-20260917`. This confirms that call worked; it is not an accuracy benchmark or a guarantee of future provider availability.

The build produces `dist/` with relative asset paths for an HTTPS static host at a root or subpath. No server secrets are needed. Generated output and dependencies are excluded from source control. The OpenRouter Decisions endpoint is an alpha API; model access, CORS behavior, and the contract may change.

## Small evaluation

`samples/support-tickets.json` has 12 synthetic tickets and expected routes, including an intentionally ambiguous case. Run them with the support preset and record expected choice, returned choice/confidence, proposed route, and latency. Compare accuracy and review rate across thresholds using the same responses. This tiny exercise does not establish production accuracy or confidence calibration.

## Source guide

- `src/main.ts` — interface, request snapshots, and runtime state.
- `src/core.ts` — HTTP adapter, redaction, and routing rule.
- `src/presets.ts` — educational examples.
- `src/core.test.ts` — synthetic adapter and rule tests.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and the [MIT license](LICENSE).

## References

- [OpenRouter Jev example](https://openrouter.ai/labs/jev/compile)
- [Official OpenRouter Decisions SDK implementation](https://github.com/OpenRouterTeam/typescript-sdk/blob/main/src/funcs/alphaDecisionsCreate.ts)
- [TypeSafe Score](https://docs.typesafe.ai/primitives/score)
- [TypeSafe confidence](https://docs.typesafe.ai/confidence)
