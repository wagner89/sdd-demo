# Change: Todo App

## What

Build a single-page to-do list web app using Vite + React.

Users can:
- Add a task by typing in an input field and pressing a button (or Enter)
- Mark a task as complete with a checkbox
- Delete a task from the list

## Why

This app is the vehicle for a live Spec-Driven Development demo. The goal is to illustrate the full SDD workflow — explore, propose, review, apply, archive — using a problem familiar enough that colleagues can focus on the *process*, not the domain.

## Scope

**In scope**
- Add, complete, and delete tasks
- In-memory state only (no backend, no localStorage)
- Empty-state message when no tasks exist
- Disabled add button when input is empty or whitespace-only
- Plain CSS styling — no UI library

**Out of scope**
- Persistence across page refreshes (intentional — state is ephemeral by design)
- Filtering or sorting tasks
- Editing existing tasks
- Due dates, priorities, or categories
- Authentication or multi-user support

## Key Decisions from Exploration

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Completed task treatment | In-place strikethrough, no section split | Simpler state, fewer components |
| Duplicate tasks | Allowed | No meaningful harm; avoids validation complexity |
| Long task text | Wraps naturally | CSS handles it; not a spec concern |
| New task position | Appended to bottom | Natural reading order |
| State ephemerality | Explicit in spec as acceptance criterion | Prevents scope creep during apply |

## Component Shape

```
App
├── TaskInput     ← controlled input + add button
└── TaskList
    └── TaskItem  ← checkbox + label + delete button
```

## Stack

- Vite + React
- Plain CSS (no UI library)
- Node 22 / npm 11
