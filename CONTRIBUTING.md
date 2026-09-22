# Contributing

Keep the lab small, understandable, and useful for learning typed model decisions.

1. Use Node.js 22.18+ and run `npm ci`.
2. Run `npm run dev` to work locally.
3. Make a focused change and explain the user-visible behavior in your pull request.
4. Run `npm test` and `npm run build`. For UI changes, check the three-column desktop layout and a narrow mobile viewport.

Tests use synthetic responses and must not require an API key or make paid requests. Add meaningful coverage for adapter, routing, and credential-handling changes. Clearly label any manual live verification.

Preserve the runtime-only credential boundary: no key persistence, logging, analytics, or server proxy. Request previews and error messages must never expose the key. Do not commit real keys, personal inputs, provider response captures, `node_modules/`, or `dist/`. Use synthetic examples for reports and tests.

See [SECURITY.md](SECURITY.md) for security-reporting guidance. Contributions are under the project's [MIT license](LICENSE).
