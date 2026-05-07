# Tasks: Todo App

Implementation checklist — work top to bottom. Each task references the spec criteria it satisfies.

---

## Setup

- [x] **T-1** Scaffold Vite + React project in `sdd-demo/`
  ```bash
  npm create vite@latest . -- --template react
  npm install
  ```

- [x] **T-2** Strip Vite boilerplate — remove default content from `App.jsx`, `App.css`, and `index.css`; keep file structure intact

---

## State

- [x] **T-3** In `App.jsx`, define state:
  ```js
  const [tasks, setTasks] = useState([])       // task list
  const [inputValue, setInputValue] = useState('') // controlled input
  ```

---

## Components

- [x] **T-4** Create `src/components/TaskInput.jsx`
  - Controlled `<input>` bound to `value` / `onChange` props
  - Add `<button>` bound to `onAdd` prop
  - Button is `disabled` when `value.trim() === ''`
  - `onKeyDown`: call `onAdd` when Enter is pressed and input is not empty
  - *Satisfies: AC-2, AC-3*

- [x] **T-5** In `App.jsx`, implement `handleAdd`:
  - Trims input value; does nothing if empty
  - Appends `{ id: crypto.randomUUID(), text, completed: false }` to `tasks`
  - Clears `inputValue`
  - *Satisfies: AC-1*

- [x] **T-6** Create `src/components/TaskList.jsx`
  - Receives `tasks`, `onToggle`, `onDelete` as props
  - If `tasks.length === 0`, renders `<p>No tasks yet.</p>`
  - Otherwise renders a `<ul>` of `<TaskItem>` elements, each with `key={task.id}`
  - *Satisfies: AC-7*

- [x] **T-7** Create `src/components/TaskItem.jsx`
  - Receives `task`, `onToggle`, `onDelete` as props
  - Renders a `<li>` with:
    - `<input type="checkbox">` checked by `task.completed`, calls `onToggle(task.id)` on change
    - `<label>` with `task.text`, styled with `text-decoration: line-through` when `task.completed`
    - `<button>` that calls `onDelete(task.id)` on click
  - *Satisfies: AC-4, AC-5, AC-6*

- [x] **T-8** In `App.jsx`, implement `handleToggle` and `handleDelete`:
  - `handleToggle(id)`: maps over tasks, flips `completed` on matching id
  - `handleDelete(id)`: filters out the task with matching id

---

## Wiring

- [x] **T-9** Assemble `App.jsx` — render `TaskInput` and `TaskList` with all handlers and state wired up

---

## Styling

- [x] **T-10** Add minimal CSS to `App.css`:
  - Centered container, max-width ~600px
  - Input and button on the same row
  - Completed task label with `text-decoration: line-through` and reduced opacity
  - Comfortable spacing between task rows

---

## Verify

- [x] **T-11** Run `npm run dev` and manually verify all acceptance criteria:
  - AC-1: add a task → appears at bottom, input clears
  - AC-2: press Enter → same as clicking Add
  - AC-3: empty/whitespace input → button is disabled
  - AC-4: checkbox toggles completed state
  - AC-5: completed task shows strikethrough
  - AC-6: Delete removes only that task
  - AC-7: empty list shows "No tasks yet."
  - AC-8: refresh → list is empty
