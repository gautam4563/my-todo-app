import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import './App.css'
import WelcomePage from './components/WelcomePage'
import TodoListPage from './components/TodoListPage'
import AddTodoPage from './components/AddTodoPage'
import { db } from './firebase'

const getTodosForEmail = async (email) => {
  if (!email) return []

  const userDocRef = doc(db, 'users', email)
  const userDoc = await getDoc(userDocRef)

  return userDoc.exists() ? userDoc.data().todos || [] : []
}

const saveTodosForEmail = async (email, tasks) => {
  if (!email) return

  const userDocRef = doc(db, 'users', email)
  await setDoc(userDocRef, { email, todos: tasks }, { merge: true })
}

function App() {
  const today = new Date().toISOString().split('T')[0]

  const [currentPage, setCurrentPage] = useState('welcome')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [todos, setTodos] = useState([])
  const [selectedDate, setSelectedDate] = useState(today)

  useEffect(() => {
    if (!isLoggedIn && currentPage !== 'welcome') {
      setCurrentPage('welcome')
    }
  }, [isLoggedIn, currentPage])

  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential
    const payload = JSON.parse(atob(token.split('.')[1]))

    const userData = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    }

    const savedTodos = await getTodosForEmail(userData.email)

    setUser(userData)
    setTodos(savedTodos)
    setIsLoggedIn(true)
    setCurrentPage('todoList')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setTodos([])
    setCurrentPage('welcome')
  }

  const handleAddTodo = async ({ title, date }) => {
    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      date: date || selectedDate,
      completed: false,
      tag: 'Task',
    }

    const updatedTodos = [newTodo, ...todos]
    setTodos(updatedTodos)

    if (user?.email) {
      await saveTodosForEmail(user.email, updatedTodos)
    }

    setCurrentPage('todoList')
  }

  const handleToggleTodo = async (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    )

    setTodos(updatedTodos)

    if (user?.email) {
      await saveTodosForEmail(user.email, updatedTodos)
    }
  }

  const handleDeleteTodo = async (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId)
    setTodos(updatedTodos)

    if (user?.email) {
      await saveTodosForEmail(user.email, updatedTodos)
    }
  }

  const handleMoveTodo = async (todoId, newDate) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, date: newDate || todo.date } : todo,
    )

    setTodos(updatedTodos)

    if (user?.email) {
      await saveTodosForEmail(user.email, updatedTodos)
    }
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