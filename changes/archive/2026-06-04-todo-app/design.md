# Design: Todo App

## Architecture

Single-page app with no routing. All state lives in `App` via `useState`. No context, no store.

### Component tree

```
App
├── TaskInput     ← controlled input + add button
└── TaskList
    └── TaskItem  ← checkbox + label + delete button
```

### State shape

```js
// in App
const [tasks, setTasks] = useState([]);
const [inputValue, setInputValue] = useState('');

// task object
{ id: crypto.randomUUID(), text: string, completed: boolean }
```

### Data flow

- `App` owns all state and passes handlers down as props
- `TaskInput` receives `value`, `onChange`, and `onAdd`
- `TaskList` receives `tasks`, `onToggle`, and `onDelete`
- `TaskItem` receives a single `task`, `onToggle`, and `onDelete`

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Unique IDs | `crypto.randomUUID()` | Stable, collision-free, no extra dependency |
| Completed treatment | In-place strikethrough | Simpler state, no section split needed |
| Task position on add | Appended to bottom | Natural reading order |
| Duplicate tasks | Allowed | Avoids validation complexity |
| Long text | Wraps in CSS | Not a spec concern |
| Persistence | None (in-memory only) | Explicit scope decision — ephemeral by design |
| Styling | Plain CSS, single `App.css` file | No UI library per project rules |
| Add trigger | Button click OR Enter key | Standard input UX |

## File Layout

```
src/
  App.jsx
  App.css
  components/
    TaskInput.jsx
    TaskList.jsx
    TaskItem.jsx
```

No additional CSS files per component — all styles in `App.css` to keep the demo focused.
