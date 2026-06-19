# AI Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe AI Cognition Studio as a work-first AI Builder portfolio while
preserving its knowledge-base experience.

**Architecture:** Extend Markdown front matter with optional portfolio metadata,
then render selected projects and the portfolio narrative from the generated
content index. Keep case-study content in Markdown and use route-aware layout
classes to give only the homepage a wide canvas.

**Tech Stack:** React 19, React Router 7, TypeScript, Vite 6, gray-matter,
Node test runner, Markdown.

---

### Task 1: Portfolio content metadata

- [ ] Add failing tests for valid, missing, and invalid portfolio metadata.
- [ ] Implement a pure metadata normalizer and integrate it into content build.
- [ ] Add metadata to four selected source documents.
- [ ] Run tests and production build.
- [ ] Commit `feat(studio): add portfolio content metadata`.

### Task 2: Work-first homepage

- [ ] Add tests for stable selected-project ordering.
- [ ] Implement portfolio content selectors.
- [ ] Replace the category-first homepage with identity, selected work, method,
      point of view, latest notes, and Studio navigation.
- [ ] Add a homepage-only wide layout without changing content pages.
- [ ] Run tests and production build.
- [ ] Commit `feat(studio): redesign homepage as AI portfolio`.

### Task 3: Project Incubator case study

- [ ] Expand the README into an evidence-based case study.
- [ ] Create and export the eight-stage workflow visual as PNG.
- [ ] Verify the case route and asset rendering.
- [ ] Commit `docs(labs): turn project incubator into case study`.

### Task 4: Responsive polish

- [ ] Add tablet and mobile layout rules for the hero, selected work, method,
      viewpoint, and Studio navigation.
- [ ] Ignore `.superpowers/` brainstorming artifacts.
- [ ] Check 375px, 768px, and 1280px viewports.
- [ ] Commit `style(studio): polish portfolio responsive layout`.

### Task 5: Release

- [ ] Run tests and production build with the GitHub Pages base.
- [ ] Verify selected routes, search, sidebar, TOC, 404 fallback, and console.
- [ ] Fetch and rebase if necessary.
- [ ] Push `main`, confirm the Pages workflow, and verify the deployed site.
