import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Check } from 'lucide-react';
import Button from '../components/Button';
import StateView from '../components/StateView';
import { api, rememberCityName, SUPPORTED_CITY_CODES } from '../api/client';
import { useApi } from '../hooks/useApi';
import './CitySelect.css';

export default function CitySelect() {
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { data, error: loadError, isLoading } = useApi(() => api.listCities(), []);

  async function handleApply() {
    setError('');
    try {
      const result = await api.selectCity(selected);
      rememberCityName(result.selectedCity?.name || selected);
      navigate(`/city/${selected}`);
    } catch (err) {
      setError(err.message || 'Could not select this city');
    }
  }

  if (isLoading) return <StateView status="loading" message="Loading cities…" />;
  if (loadError) return <StateView status="error" message={loadError.message} />;

  const cities = data?.cities || [];

  return (
    <main className="city-select">
      <header className="city-select__header">
        <h1 className="city-select__title">Welcome to flavors of EY GDS</h1>
        <p className="city-select__subtitle">Select your favorite city to start and explore more</p>
      </header>

      <ul className="city-select__grid">
        {cities.map((city) => {
          const isSupported = SUPPORTED_CITY_CODES.includes(city.id);
          const isSelected = selected === city.id;

          return (
            <li key={city.id}>
              <button
                type="button"
                className={`city-tile${isSelected ? ' city-tile--selected' : ''}`}
                onClick={() => setSelected(city.id)}
                disabled={!isSupported}
                aria-pressed={isSelected}
                title={isSupported ? city.name : `${city.name} - content coming soon`}
              >
                {isSelected && (
                  <span className="city-tile__check">
                    <Check size={16} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                )}
                <Building2 size={24} strokeWidth={1.75} aria-hidden="true" />
                <span className="city-tile__name">{city.name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {error && (
        <p className="city-select__error" role="alert">
          {error}
        </p>
      )}

      <div className="city-select__actions">
        <Button variant="primary" size="lg" onClick={handleApply} disabled={!selected}>
          Apply
        </Button>
      </div>
    </main>
  );
}
