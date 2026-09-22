# Security

The browser sends the supplied API key directly to OpenRouter. This app keeps it in runtime memory and does not intentionally persist it or send it to an application backend. The browser, its extensions, and OpenRouter remain within the credential trust boundary. See the [README](README.md#runtime-key-boundary) for details.

## Reporting a problem

Never include API keys, authorization headers, private input text, or unredacted network captures in a public issue, pull request, screenshot, or log. Use synthetic data for a safe reproduction. If a key was exposed, revoke or rotate it with OpenRouter.

A private reporting channel is not currently documented here. Do not assume GitHub private vulnerability reporting is enabled. If a problem cannot be described safely in public, request a private contact method from the maintainer without disclosing the exploit or any secrets. For non-sensitive bugs, a minimal public issue is appropriate.

This learning project has no formal security support schedule. Updates are provided on a best-effort basis.
