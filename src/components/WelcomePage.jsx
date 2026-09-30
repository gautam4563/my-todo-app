import { GoogleLogin } from '@react-oauth/google';

function WelcomePage({ onLogin }) {
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
            console.log('Login success', credentialResponse);
            onLogin?.();
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