# AI Portfolio Design

## Goal

Turn AI Cognition Studio from a category-first knowledge base into a work-first
portfolio for a composite AI Builder. Potential employers and collaborators are
the primary audience; developers, AI learners, and the author's future self
remain supported through the existing knowledge-base navigation.

## Narrative

The homepage follows one persuasion path:

1. Identity: AI Builder focused on product judgment, agent engineering, and
   human-AI collaboration.
2. Selected work: one primary case and three supporting projects.
3. Method: judge, design, build, verify.
4. Point of view: AI is a copilot whose capability comes from Context, Tools,
   and human review.
5. Latest writing and the existing Studio categories.

## Selected Work

Project Incubator is the primary case study. Inspiration Curator, Social Video
Toolkit, and the domestic LLM integration guide are supporting projects. Each
selected project declares a display order, portfolio label, outcome, and
capability tags in Markdown front matter.

## Case Study Standard

A complete case presents the problem, decisions, system, inspectable evidence,
verified scope, limitations, and lessons learned. It must not invent usage
metrics or claim that untested workflow stages have been validated.

## Technical Shape

Keep React, Vite, the Markdown build pipeline, search, sidebar, and content
routes. Add optional portfolio metadata to the generated content index. The
homepage gets a wide layout while content pages retain the existing reading
layout. No CMS, database, authentication, or new UI framework is introduced.

## Acceptance

- The homepage establishes identity and selected work above the fold.
- Four selected projects link to valid content routes in a stable order.
- Project Incubator reads as a full case study.
- Existing content remains searchable and readable.
- Desktop, tablet, and mobile layouts have no horizontal overflow.
- Tests and the production build pass under the GitHub Pages base path.
