import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookingPot, Soup, UtensilsCrossed } from 'lucide-react';
import Button from '../components/Button';
import './Splash.css';

const SLIDES = [
  {
    Icon: Soup,
    title: 'Flavors of EY GDS',
    body: 'Splash and loading screen',
    auto: true,
  },
  {
    Icon: UtensilsCrossed,
    title: 'Flavors of EY GDS',
    body: 'Login instruction will appear here',
    auto: true,
  },
  {
    Icon: CookingPot,
    title: 'Welcome to flavors of EY GDS',
    body: 'Select your favorite city to start and explore more',
    auto: false,
  },
];

export default function Splash() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const slide = SLIDES[index];

  useEffect(() => {
    if (!slide.auto) return undefined;
    const timer = setTimeout(() => setIndex((current) => current + 1), 1800);
    return () => clearTimeout(timer);
  }, [slide]);

  return (
    <main className="splash">
      <p className="splash__brand">EY</p>
      <slide.Icon size={32} strokeWidth={1.75} aria-hidden="true" />
      <h1 className="splash__title">{slide.title}</h1>
      <p className="splash__body">{slide.body}</p>

      {slide.auto ? (
        <div className="splash__progress" aria-hidden="true">
          <span className="splash__progress-bar" />
        </div>
      ) : (
        <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
          Experience now
        </Button>
      )}
    </main>
  );
}
