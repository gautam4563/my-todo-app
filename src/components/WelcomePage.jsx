function WelcomePage({ onLogin }) {
  return (
    <section className="page-card welcome-page">
      <div className="welcome-content">
        <p className="eyebrow">Welcome</p>
        <h1>Stay on top of your tasks</h1>
        <p className="subtitle">
          Organize your day with a clean and simple todo experience.
        </p>
        <button className="primary-btn" onClick={onLogin}>
          Login with Gmail
        </button>
      </div>
    </section>
  )
}

export default WelcomePage
