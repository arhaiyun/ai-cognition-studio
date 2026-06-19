# Inspiration Curator Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a verified Inspiration Curator case study backed by one real
DeepSeek run and an explicit human review.

**Architecture:** Keep API execution in `curate.py`, extract deterministic
schema inspection and output-path helpers for unit testing, and store the
approved run as Markdown evidence referenced by the case README.

**Tech Stack:** Python 3, unittest, OpenAI-compatible DeepSeek API, Markdown,
React/Vite Studio.

---

### Task 1: Testable CLI boundaries

- [ ] Write failing unit tests for required-heading inspection and deterministic
      inbox filenames.
- [ ] Extract pure helpers and make the CLI warn on incomplete schema output.
- [ ] Run the Python tests and commit.

### Task 2: Real run and evidence

- [ ] Run the approved portfolio-transformation input through
      `deepseek-media-agent`.
- [ ] Check the response for required schema headings and secret-like values.
- [ ] Save the raw response with execution metadata and a human review.

### Task 3: Case study and release

- [ ] Rewrite the README as an evidence-based case while retaining usage docs.
- [ ] Run Python tests, Studio tests, and the Pages-base production build.
- [ ] Verify the Studio route, commit, push `main`, and confirm Pages deployment.
