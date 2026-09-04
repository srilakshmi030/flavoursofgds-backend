import Thumb from './Thumb';
import './ScreenHero.css';

export default function ScreenHero({ title, description, imageUrl }) {
  return (
    <section className="screen-hero">
      <div className="screen-hero__head">
        <h1 className="screen-hero__title">{title}</h1>
        <div className="screen-hero__image">
          <Thumb src={imageUrl} alt="" size="sm" />
        </div>
      </div>
      {description && <p className="screen-hero__description">{description}</p>}
    </section>
  );
}
