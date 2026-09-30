import { useState } from 'react'
import './App.css'
import WelcomePage from './components/WelcomePage'
import TodoListPage from './components/TodoListPage'
import AddTodoPage from './components/AddTodoPage'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')

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
        </nav>
      </header>

      <main className="page-content">
        {currentPage === 'welcome' && (
          <WelcomePage onLogin={() => setCurrentPage('todoList')} />
        )}

        {currentPage === 'todoList' && (
          <TodoListPage onAddTodo={() => setCurrentPage('addTodo')} />
        )}

        {currentPage === 'addTodo' && (
          <AddTodoPage
            onSave={() => setCurrentPage('todoList')}
            onCancel={() => setCurrentPage('todoList')}
          />
        )}
      </main>
    </div>
  )
}

export default App
