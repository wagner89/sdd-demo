# Spec: Todo App

## Functional Requirements

### 1. Add a task

- The user can type task text into an input field
- The user can submit by clicking the **Add** button or pressing **Enter**
- The Add button is **disabled** when the input is empty or contains only whitespace
- On submit, the new task is appended to the bottom of the list
- On submit, the input field clears
- Duplicate task text is allowed

### 2. Complete a task

- Each task has a checkbox
- Checking the checkbox marks the task as complete
- Completed tasks display with **strikethrough** text
- The checkbox can be unchecked to mark the task incomplete again

### 3. Delete a task

- Each task has a Delete button
- Clicking Delete removes the task immediately
- There is no confirmation step

### 4. Empty state

- When no tasks exist, the list area displays the message: **"No tasks yet."**
- This applies both on initial load and after all tasks have been deleted

## Non-Functional Requirements

- **Ephemeral state**: all task data lives in memory only; refreshing the page resets the list. This is intentional.
- **No routing**: single page, no URL changes
- **No dependencies**: plain CSS only, no UI library

## Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | Typing text and clicking Add appends a task to the list and clears the input |
| AC-2 | Pressing Enter in the input field has the same effect as clicking Add |
| AC-3 | The Add button is disabled when the input is empty or whitespace-only |
| AC-4 | A task's checkbox toggles its completed state |
| AC-5 | A completed task is visually distinguished with strikethrough text |
| AC-6 | Clicking Delete removes only that task from the list |
| AC-7 | When the task list is empty, "No tasks yet." is displayed |
| AC-8 | Refreshing the page results in an empty list |
