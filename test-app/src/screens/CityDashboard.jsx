import { useNavigate, useParams } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Button from '../components/Button';
import StateView from '../components/StateView';
import Thumb from '../components/Thumb';
import { api } from '../api/client';
import { useApi } from '../hooks/useApi';
import './CityDashboard.css';

export default function CityDashboard() {
  const { cityCode } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useApi(() => api.dashboard(cityCode), [cityCode]);

  if (isLoading) return <StateView status="loading" />;
  if (error) return <StateView status="error" message={error.message} />;

  return (
    <div className="city-dashboard">
      <section className="city-dashboard__banner">
        <h1 className="city-dashboard__city">{data.cityName}</h1>
      </section>

      <div className="city-dashboard__content">
        <p className="body-text">{data.about?.description}</p>

        <section className="city-dashboard__about-card">
          <h2 className="section-title">{data.about?.title}</h2>
          <p className="body-text">
            {data.state}, {data.country}
          </p>
        </section>

        <section>
          <h2 className="section-title">City Snaps</h2>
          <ul className="city-dashboard__snaps">
            {(data.citySnaps || []).map((snap) => (
              <li key={snap.id}>
                <Thumb src={snap.imageUrl} alt={snap.caption} size="sm" />
              </li>
            ))}
          </ul>
        </section>

        <section className="city-dashboard__recipes-card">
          <h2 className="section-title">{data.topRecipesTeaser?.title}</h2>
          <p className="body-text">{data.topRecipesTeaser?.description}</p>
          <Button variant="secondary" size="sm" onClick={() => navigate(`/city/${cityCode}/winning-recipes`)}>
            Checkout the stories
          </Button>
        </section>
      </div>

      <Button variant="primary" size="sm" onClick={() => navigate('/cities')}>
        <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
        Change city
      </Button>
    </div>
  );
}
