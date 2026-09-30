const sampleTodos = [
  { id: 1, title: 'Prepare sprint plan', tag: 'Work', time: '9:00 AM' },
  { id: 2, title: 'Buy groceries', tag: 'Personal', time: '11:30 AM' },
  { id: 3, title: 'Workout session', tag: 'Health', time: '6:00 PM' },
]

function TodoListPage({ onAddTodo }) {
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
            <div className="todo-check" aria-label="Task complete" />
            <div className="todo-details">
              <h3>{todo.title}</h3>
              <div className="todo-meta">
                <span className="todo-tag">{todo.tag}</span>
                <span>{todo.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TodoListPage
