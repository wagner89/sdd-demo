# SDD Demo: Todo App

This repo is the artifact of a live **Spec-Driven Development (SDD)** walkthrough.
Everything you see here — the specs, the code, the structure — was produced step by step
during the session you just watched. This document explains what each file is, why it
exists, and how it connects to the rest.

---

## What is SDD?

Spec-Driven Development is a workflow where **you write what you're building before you
build it.** Each step produces a document. The documents are reviewed and agreed on before
the next step starts. Code only appears at the end — and when it does, every line traces
back to a spec decision.

The workflow has five steps:

```
Explore → Propose → Review → Apply → Archive
```

This repo contains the output of all five.

---

## The Spec Artifacts

Everything under `changes/todo-app/` was written *before any code existed*.

### `changes/todo-app/change.md` — What & Why

The first document produced, at the end of the **Explore** phase.

It captures:
- What we're building and why (the demo context)
- What's explicitly in scope and out of scope
- Key decisions made during the exploration conversation — with rationale
- The component shape agreed on before design started

This is the alignment document. If two people disagree about scope later, this is what
you check.

### `changes/todo-app/design.md` — How

Written during the **Propose** phase. It answers the question: *how will this be built?*

It captures:
- The component tree (`App → TaskInput, TaskList → TaskItem`)
- The state shape (`tasks[]` and `inputValue`, both owned by `App`)
- The props contract for each component (what each one receives)
- Architectural decisions and their rationale (e.g. why `crypto.randomUUID()`, why plain CSS)
- The file layout

A good design document means no one has to reverse-engineer intent from the code.

### `changes/todo-app/spec.md` — Requirements & Acceptance Criteria

Also from the **Propose** phase. This is the source of truth for what the app must do.

It contains:
- Functional requirements broken down by feature (add, complete, delete, empty state)
- Non-functional requirements (ephemeral state is intentional, no routing, no deps)
- 8 numbered acceptance criteria (AC-1 through AC-8)

Each acceptance criterion is independently verifiable. If you can check every AC manually
and they all pass, the app is done. No interpretation required.

### `changes/todo-app/tasks.md` — Implementation Checklist

The final artifact before code. Each task is:
- Atomic (one concrete thing to do)
- Ordered (dependencies respected)
- Traceable (references the AC it satisfies)

Tasks T-1 through T-11 map directly to the commits in this branch. When a task was done,
its checkbox was ticked. The file went from all `[ ]` to all `[x]` during the **Apply**
phase — one task at a time.

---

## The Code

All source code lives in `src/`. It was written *after* all four spec documents existed,
following `tasks.md` top to bottom.

### `src/App.jsx` — Orchestrator

Owns all application state and logic. Nothing else has state.

```
state:    tasks[]        — array of { id, text, completed }
          inputValue     — the controlled input string

handlers: handleAdd()    — trims, creates task, clears input       (→ AC-1)
          handleToggle() — flips task.completed by id              (→ AC-4)
          handleDelete() — removes task by id                      (→ AC-6)
```

Renders `TaskInput` and `TaskList`, passing handlers down as props.
No rendering logic lives here — App is pure orchestration.

### `src/components/TaskInput.jsx` — Add Row

Receives: `value`, `onChange`, `onAdd`

Renders the text input and Add button. Two spec rules enforced here:
- Button is `disabled` when `value.trim() === ''` (→ AC-3)
- `onKeyDown` calls `onAdd` when Enter is pressed (→ AC-2)

### `src/components/TaskList.jsx` — List Container

Receives: `tasks`, `onToggle`, `onDelete`

One decision lives here: if `tasks.length === 0`, render `"No tasks yet."` instead of an
empty list (→ AC-7). Otherwise, render a `TaskItem` for each task with a stable `key`.

### `src/components/TaskItem.jsx` — Single Task Row

Receives: `task`, `onToggle`, `onDelete`

Renders one row: checkbox, label, delete button.
- Checkbox calls `onToggle(task.id)` on change (→ AC-4)
- Label gets `className="completed"` when `task.completed` is true (→ AC-5)
- Delete button calls `onDelete(task.id)` (→ AC-6)

### `src/App.css` — Styles

All styles live in one file, as decided in `design.md`. Covers the container layout,
input row, task list spacing, completed state (strikethrough + reduced opacity), and
the empty state message. No per-component CSS files.

---

## The Relationship Between Spec and Code

This table shows how spec decisions became code:

| Spec artifact | Decision | Where it landed |
|---------------|----------|-----------------|
| `change.md` | In-memory state only | No localStorage, no fetch anywhere |
| `change.md` | In-place strikethrough (no section split) | `TaskItem` CSS, no completed section in `TaskList` |
| `design.md` | `App` owns all state | Only `App.jsx` uses `useState` |
| `design.md` | `crypto.randomUUID()` for IDs | `handleAdd()` in `App.jsx` |
| `spec.md` AC-2 | Enter key triggers add | `onKeyDown` in `TaskInput.jsx` |
| `spec.md` AC-3 | Button disabled on empty input | `disabled={value.trim() === ''}` in `TaskInput.jsx` |
| `spec.md` AC-7 | "No tasks yet." empty state | Early return in `TaskList.jsx` |
| `spec.md` AC-8 | Ephemeral state | No persistence code exists anywhere |

---

## Running the App

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

To verify the spec manually, work through AC-1 to AC-8 in `changes/todo-app/spec.md`.

---

## What SDD Gave Us

- **No surprises during implementation.** Every decision was made and recorded before
  a line of code was written.
- **A reviewable paper trail.** The `changes/todo-app/` directory tells the full story
  of why the app is built the way it is.
- **A checklist that doubles as a progress tracker.** `tasks.md` went from empty to
  fully checked without anyone needing to hold the state in their head.
- **Repeatable.** The next change to this app starts the same way: explore, propose,
  review, apply, archive.
