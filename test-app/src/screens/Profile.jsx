import { useNavigate } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';
import Button from '../components/Button';
import StateView from '../components/StateView';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import './Profile.css';

export default function Profile() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { data, error, isLoading } = useApi(() => api.userProfile(), []);

  if (isLoading) return <StateView status="loading" />;
  if (error) return <StateView status="error" message={error.message} />;

  function handleSignOut() {
    signOut();
    navigate('/login', { replace: true });
  }

  return (
    <main className="profile">
      <CircleUserRound size={32} strokeWidth={1.75} aria-hidden="true" />
      <h1 className="profile__name">{data.name || 'EY GDS colleague'}</h1>

      <dl className="profile__list">
        <div className="profile__row">
          <dt className="profile__label">Email</dt>
          <dd className="profile__value">{data.email || '-'}</dd>
        </div>
        <div className="profile__row">
          <dt className="profile__label">User ID</dt>
          <dd className="profile__value">{data.userId || '-'}</dd>
        </div>
        <div className="profile__row">
          <dt className="profile__label">Tenant</dt>
          <dd className="profile__value">{data.tenantId || '-'}</dd>
        </div>
      </dl>

      <Button variant="secondary" size="lg" onClick={handleSignOut}>
        Sign out
      </Button>
    </main>
  );
}
