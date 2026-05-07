function TaskInput({ value, onChange, onAdd }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter' && value.trim() !== '') {
      onAdd()
    }
  }

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Add a task…"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onAdd} disabled={value.trim() === ''}>
        Add
      </button>
    </div>
  )
}

export default TaskInput
