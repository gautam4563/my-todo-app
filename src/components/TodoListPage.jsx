const sampleTodos = [
  { id: 1, title: 'Prepare sprint plan', tag: 'Work', time: '9:00 AM' },
  { id: 2, title: 'Buy groceries', tag: 'Personal', time: '11:30 AM' },
  { id: 3, title: 'Workout session', tag: 'Health', time: '6:00 PM' },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.2 4.2L19 2.7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M9 7V4h6v3m-8 0l1 12h8l1-12M10 11v5m4-5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MoveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 7h8M8 12h8M8 17h8M5 7h.01M5 12h.01M5 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ActionButton({ label, variant, children, onClick }) {
  return (
    <button type="button" className={`action-btn ${variant}`} aria-label={label} title={label} onClick={onClick}>
      {children}
    </button>
  )
}

function TodoListPage({ onAddTodo }) {
  const handleMoveClick = (event) => {
    const input = event.currentTarget.parentElement?.querySelector('input[type="date"]')
    if (input) {
      input.showPicker?.()
      input.click()
    }
  }

  return (
    <section className="page-card list-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">My Tasks</p>
          <h2>Todo List</h2>
        </div>
        <button className="secondary-btn" onClick={onAddTodo}>
          + Add Todo
        </button>
      </div>

      <ul className="todo-list">
        {sampleTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div className="todo-actions" aria-label="Todo actions">
              <ActionButton label="Mark as done" variant="done">
                <CheckIcon />
              </ActionButton>
              <ActionButton label="Delete task" variant="delete">
                <DeleteIcon />
              </ActionButton>
              <ActionButton label="Move task" variant="move" onClick={handleMoveClick}>
                <MoveIcon />
              </ActionButton>
              <input type="date" className="move-date-input" aria-label={`Move task ${todo.id}`} />
            </div>

            <div className="todo-details">
              <div className="todo-meta">
                <span className="todo-tag">{todo.tag}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TodoListPage
