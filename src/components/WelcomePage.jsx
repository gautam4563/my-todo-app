import { GoogleLogin } from '@react-oauth/google';

function WelcomePage({ isLoggedIn, user, onLogin, onLogout }) {
  if (isLoggedIn) {
    return (
      <section className="page-card welcome-page">
        <div className="welcome-content">
          <p className="eyebrow">Welcome back</p>

          {user?.picture && (
            <img
              src={user.picture}
              alt={user.name}
              style={{ width: 70, height: 70, borderRadius: '50%', marginBottom: 16 }}
            />
          )}

          <h1>Hello, {user?.name || 'User'}</h1>

          <p className="subtitle">
            You are signed in with your Google account.
          </p>

          <button className="primary-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-card welcome-page">
      <div className="welcome-content">
        <p className="eyebrow">Welcome</p>
        <h1>Stay on top of your tasks</h1>
        <p className="subtitle">
          Organize your day with a clean and simple todo experience.
        </p>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            onLogin?.(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </section>
  );
}

export default WelcomePage;