# SDD Demo — To-Do App

## Project

A simple Vite + React to-do app built live during a Spec-Driven Development (SDD) demo.

## Stack

- Vite + React
- Plain CSS (no UI library)

## SDD Workflow

This project follows the OpenSpec SDD workflow. All changes live in `changes/`.

### Steps (in order)

1. `/explore` — Think through the problem before writing anything
2. `/propose` — Generate the full spec package (design + spec + tasks)
3. Review the generated files together
4. `/apply` — Implement task by task from the spec
5. `/archive` — Finalize the change and close the loop

### Artifact structure per change

```
changes/
  <change-name>/
    change.md   ← what & why
    design.md   ← how (architecture, decisions)
    spec.md     ← requirements and acceptance criteria
    tasks.md    ← ordered implementation checklist
```

## Ground Rules

- No code is written before a spec exists
- Every implementation task traces back to a spec requirement
- Changes are reviewed before apply starts
