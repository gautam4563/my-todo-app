function AddTodoPage({ onSave, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSave()
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
          <input type="text" placeholder="Enter task title" />
        </label>

        <label>
          <span>Category</span>
          <select defaultValue="">
            <option value="" disabled>
              Select category
            </option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
          </select>
        </label>

        <label>
          <span>Due Date</span>
          <input type="date" />
        </label>

        <label>
          <span>Description</span>
          <textarea rows="4" placeholder="Add more details..." />
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
