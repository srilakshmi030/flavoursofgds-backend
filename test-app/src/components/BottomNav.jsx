import { Beef, Landmark, Utensils, CookingPot } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const ITEMS = [
  { to: 'street-food', label: 'Street Food', Icon: Beef },
  { to: 'landmarks', label: 'Landmarks', Icon: Landmark },
  { to: 'fine-dining', label: 'Fine Dine', Icon: Utensils },
  { to: 'recipes', label: 'Recipes', Icon: CookingPot },
];

export default function BottomNav({ cityCode }) {
  return (
    <nav className="bottom-nav" aria-label="City sections">
      {ITEMS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={`/city/${cityCode}/${to}`}
          className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
        >
          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
          <span className="bottom-nav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
