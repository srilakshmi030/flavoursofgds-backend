import { ArrowLeft, CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

export default function TopBar({ title, showBack = true, onProfileClick }) {
  const navigate = useNavigate();

  return (
    <header className="top-bar">
      <div className="top-bar__left">
        {showBack && (
          <button type="button" className="top-bar__icon-button" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        )}
        <span className="top-bar__title" title={title}>
          {title}
        </span>
      </div>
      <button type="button" className="top-bar__icon-button" onClick={onProfileClick} aria-label="Open profile">
        <CircleUserRound size={24} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </header>
  );
}
