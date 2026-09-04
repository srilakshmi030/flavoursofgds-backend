import { Loader, SearchX, TriangleAlert } from 'lucide-react';
import './StateView.css';

export default function StateView({ status, message }) {
  const config = {
    loading: { Icon: Loader, text: message || 'Loading…' },
    error: { Icon: TriangleAlert, text: message || 'Something went wrong.' },
    empty: { Icon: SearchX, text: message || 'Nothing here yet.' },
  }[status];

  const { Icon, text } = config;

  return (
    <div className={`state-view state-view--${status}`} role="status">
      <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
      <p className="state-view__text">{text}</p>
    </div>
  );
}
