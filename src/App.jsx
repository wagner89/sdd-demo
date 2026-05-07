import { useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  function handleToggle(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function handleDelete(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleAdd() {
    const text = inputValue.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: crypto.randomUUID(), text, completed: false }])
    setInputValue('')
  }

  return (
    <div className="app">
      <h1>Todo</h1>
      <TaskInput
        value={inputValue}
        onChange={setInputValue}
        onAdd={handleAdd}
      />
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
