import { useState, useEffect } from 'react'
import './App.css'
import WelcomePage from './components/WelcomePage'
import TodoListPage from './components/TodoListPage'
import AddTodoPage from './components/AddTodoPage'

const initialTodos = [
  { id: 1, title: 'Prepare sprint plan', date: '2026-10-02', completed: false, tag: 'Work' },
  { id: 2, title: 'Buy groceries', date: '2026-10-03', completed: false, tag: 'Personal' },
  { id: 3, title: 'Workout session', date: '2026-10-04', completed: false, tag: 'Health' },
]

function App() {
  const today = new Date().toISOString().split('T')[0]

  const [currentPage, setCurrentPage] = useState('welcome')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [todos, setTodos] = useState(initialTodos)
  const [selectedDate, setSelectedDate] = useState(today)

  useEffect(() => {
    if (!isLoggedIn && currentPage !== 'welcome') {
      setCurrentPage('welcome')
    }
  }, [isLoggedIn, currentPage])

  const handleGoogleLogin = (credentialResponse) => {
    const token = credentialResponse.credential
    const payload = JSON.parse(atob(token.split('.')[1]))

    const userData = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    }

    setUser(userData)
    setIsLoggedIn(true)
    setCurrentPage('todoList')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setCurrentPage('welcome')
  }

  const handleAddTodo = ({ title, date }) => {
    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      date: date || selectedDate,
      completed: false,
      tag: 'Task',
    }

    setTodos((previousTodos) => [newTodo, ...previousTodos])
    setCurrentPage('todoList')
  }

  const handleToggleTodo = (todoId) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleDeleteTodo = (todoId) => {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== todoId))
  }

  const handleMoveTodo = (todoId, newDate) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === todoId ? { ...todo, date: newDate || todo.date } : todo,
      ),
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">TodoFlow</div>

        <nav className="nav">
          <button
            className={currentPage === 'welcome' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentPage('welcome')}
          >
            Welcome
          </button>

          {isLoggedIn && (
            <>
              <button
                className={currentPage === 'todoList' ? 'nav-btn active' : 'nav-btn'}
                onClick={() => setCurrentPage('todoList')}
              >
                Todo List
              </button>

              <button
                className={currentPage === 'addTodo' ? 'nav-btn active' : 'nav-btn'}
                onClick={() => setCurrentPage('addTodo')}
              >
                Add Todo
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="page-content">
        {currentPage === 'welcome' && (
          <WelcomePage
            isLoggedIn={isLoggedIn}
            user={user}
            onLogin={handleGoogleLogin}
            onLogout={handleLogout}
          />
        )}

        {currentPage === 'todoList' && (
          <TodoListPage
            todos={todos}
            selectedDate={selectedDate}
            onSelectedDateChange={setSelectedDate}
            onAddTodo={() => setCurrentPage('addTodo')}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            onMoveTodo={handleMoveTodo}
          />
        )}

        {currentPage === 'addTodo' && (
          <AddTodoPage
            defaultDate={selectedDate}
            onSave={handleAddTodo}
            onCancel={() => setCurrentPage('todoList')}
          />
        )}
      </main>
    </div>
  )
}

export default App