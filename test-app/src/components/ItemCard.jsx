import { Link } from 'react-router-dom';
import Thumb from './Thumb';
import './ItemCard.css';

export default function ItemCard({ to, title, description, imageUrl }) {
  return (
    <Link to={to} className="item-card">
      <Thumb src={imageUrl} alt={title} size="md" />
      <h3 className="item-card__title" title={title}>
        {title}
      </h3>
      <p className="item-card__description">{description}</p>
    </Link>
  );
}
