import { useState, useEffect } from 'react'

function AddTodoPage({ defaultDate, onSave, onCancel }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(defaultDate || '')

  useEffect(() => {
    if (defaultDate) {
      setDate(defaultDate)
    }
  }, [defaultDate])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    onSave({ title, date })
    setTitle('')
    setDate('')
  }

  return (
    <section className="page-card form-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">New Task</p>
          <h2>Add Todo</h2>
        </div>
      </div>

      <form className="todo-form" onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>

        <label>
          <span>Due Date</span>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </label>

        <div className="form-actions">
          <button type="button" className="ghost-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="primary-btn">
            Save Todo
          </button>
        </div>
      </form>
    </section>
  )
}

export default AddTodoPage
