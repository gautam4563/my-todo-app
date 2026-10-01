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

function TodoListPage({
  todos,
  selectedDate,
  onSelectedDateChange,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onMoveTodo,
}) {
  const handleMoveClick = (event) => {
    const input = event.currentTarget.parentElement?.querySelector('input[type="date"]')
    if (input) {
      input.showPicker?.()
      input.click()
    }
  }

  const filteredTodos = (selectedDate ? todos.filter((todo) => todo.date === selectedDate) : todos)
    .slice()
    .sort((a, b) => Number(a.completed) - Number(b.completed))

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

      <div className="filter-row">
        <label className="filter-control">
          <span>Filter by date</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => onSelectedDateChange(event.target.value)}
          />
        </label>

        <button type="button" className="ghost-btn" onClick={() => onSelectedDateChange('')}>
          Show all
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="empty-state">
          {selectedDate ? `No tasks for ${selectedDate}.` : 'No tasks yet. Add a new todo.'}
        </p>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-actions" aria-label="Todo actions">
                <ActionButton label="Mark as done" variant="done" onClick={() => onToggleTodo(todo.id)}>
                  <CheckIcon />
                </ActionButton>
                <ActionButton label="Delete task" variant="delete" onClick={() => onDeleteTodo(todo.id)}>
                  <DeleteIcon />
                </ActionButton>
                <ActionButton label="Move task" variant="move" onClick={handleMoveClick}>
                  <MoveIcon />
                </ActionButton>
                <input
                  type="date"
                  className="move-date-input"
                  aria-label={`Move task ${todo.id}`}
                  value={todo.date}
                  onChange={(event) => onMoveTodo(todo.id, event.target.value)}
                />
              </div>

              <div className="todo-details">
                <h3>{todo.title}</h3>
                <div className="todo-meta">
                  {todo.date && <span>{new Date(`${todo.date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TodoListPage
