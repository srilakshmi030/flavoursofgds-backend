import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Soup } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signIn(username, password);
      navigate('/cities');
    } catch (err) {
      setError(err.message || 'Sign in failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login">
      <p className="login__brand">EY</p>
      <Soup size={32} strokeWidth={1.75} aria-hidden="true" />
      <h1 className="login__title">Flavors Of EYGDS</h1>
      <p className="login__hint">Sign in with your EY account to continue</p>

      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <label className="login__label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="login__input"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div className="login__field">
          <label className="login__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="login__input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && (
          <p className="login__error" role="alert">
            {error}
          </p>
        )}

        <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Login with SSO'}
        </Button>
      </form>

      <p className="login__footer">Test build. Production sign-in redirects to Microsoft Entra ID.</p>
    </main>
  );
}
