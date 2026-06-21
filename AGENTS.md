# Efficient Codex Defaults

- Use the smallest sufficient response, context read, and tool set.
- For simple questions and narrow edits, act directly without plans, subagents,
  browser automation, web research, or unrelated skills.
- Do not run visual browser acceptance tests unless explicitly requested or
  essential to verify a user-facing frontend change.
- Read only relevant sections of large files. Do not reload instructions already
  available in the current thread.
- Prefer batched inspection calls over sequential discovery calls.
- Use subagents only for two or more substantial independent tasks.
- Keep progress updates brief for work expected to finish within two minutes.
- For prototypes, build the minimum useful artifact and request directional
  feedback before polishing, multi-viewport testing, committing, or deploying.
- Recommend a fresh thread with a compact handoff before starting a new
  workstream in a long conversation.
- Reserve high reasoning for difficult architecture, debugging, security, or an
  explicit request. Use medium reasoning for normal engineering work.
- Before expensive optional work, explain its benefit and ask for confirmation.
