# Inspiration Curator Case Study Design

## Goal

Turn Inspiration Curator from an Agent usage guide into a verifiable case study
that demonstrates how prompt rules, an output schema, and human review organize
messy ideas into actionable portfolio work.

## Evidence

Use one real input about transforming AI Cognition Studio from a learning
repository into a portfolio. Run the existing CLI against the configured
DeepSeek profile, preserve the raw output, and publish an explicit human review
that identifies useful judgments, omissions, and overreach.

The case records the execution date, provider profile, model name, input, raw
output, schema check, and human conclusions. It never exposes credentials or
claims that one run proves general reliability.

## Implementation

Extract deterministic output inspection and inbox-path construction from the CLI
so they can be tested without calling an API. The CLI warns when a model response
misses required schema headings. Keep the real API call as an explicit evidence
generation step, not an automated test.

Rewrite the README around problem, workflow design, real run, human review,
verified scope, limitations, and next experiments. The existing installation
and usage instructions remain available after the case narrative.

## Acceptance

- Deterministic helper tests pass without network access.
- One real DeepSeek response is preserved with no credential data.
- The response is reviewed rather than presented as unquestioned truth.
- The Studio case page renders through the existing Markdown pipeline.
- Production build and GitHub Pages deployment pass.
