import { useParams } from 'react-router-dom';
import StateView from '../components/StateView';
import Thumb from '../components/Thumb';
import { ITEM_LOADERS } from '../config/categories';
import { useApi } from '../hooks/useApi';
import './DetailScreen.css';

const LABELS = {
  description: 'About',
  mustTryAt: 'Must try at',
  bestTime: 'Best time',
  vegetarian: 'Vegetarian',
  builtYear: 'Built',
  visitingHours: 'Visiting hours',
  entryFee: 'Entry fee',
  address: 'Address',
  timings: 'Timings',
  signatureDishes: 'Signature dishes',
  reservationRequired: 'Reservation required',
  servings: 'Servings',
  ingredients: 'Ingredients',
  steps: 'Steps',
};

function DetailValue({ value }) {
  if (Array.isArray(value)) {
    return (
      <ol className="detail__list">
        {value.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ol>
    );
  }

  if (typeof value === 'boolean') return <p className="body-text">{value ? 'Yes' : 'No'}</p>;

  return <p className="body-text">{value}</p>;
}

export default function DetailScreen() {
  const { itemType, id } = useParams();
  const { data, error, isLoading } = useApi(() => ITEM_LOADERS[itemType](id), [itemType, id]);

  if (isLoading) return <StateView status="loading" />;
  if (error) return <StateView status="error" message={error.message} />;

  const details = data.details || {};
  const entries = Object.entries(details).filter(([key]) => key !== 'videoUrl' && key in LABELS);

  return (
    <div className="detail">
      <Thumb src={data.imageUrl} alt={data.name} size="lg" />

      <h1 className="detail__title">{data.name}</h1>
      <p className="detail__meta">
        {[data.cityName, data.area, data.cuisine, data.contributor].filter(Boolean).join(' • ')}
      </p>

      {entries.map(([key, value]) => (
        <section key={key} className="detail__section">
          <h2 className="section-title">{LABELS[key]}</h2>
          <DetailValue value={value} />
        </section>
      ))}
    </div>
  );
}
