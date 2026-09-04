import { useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import ScreenHero from '../components/ScreenHero';
import StateView from '../components/StateView';
import { CATEGORIES } from '../config/categories';
import { useApi } from '../hooks/useApi';

export default function CategoryList() {
  const { cityCode, category } = useParams();
  const config = CATEGORIES[category];

  const { data, error, isLoading } = useApi(() => config.load(cityCode), [cityCode, category]);

  if (isLoading) return <StateView status="loading" />;
  if (error) return <StateView status="error" message={error.message} />;

  const items = data?.[config.listKey] || [];

  return (
    <div>
      <ScreenHero title={config.title} description={config.intro} />

      <div className="screen-body">
        {items.length === 0 ? (
          <StateView status="empty" message={`No ${config.title.toLowerCase()} added for this city yet.`} />
        ) : (
          <ul className="card-grid reset-list">
            {items.map((item) => (
              <li key={item.id}>
                <ItemCard
                  to={`/item/${config.itemType}/${item.id}`}
                  title={item.name}
                  description={item.shortDescription}
                  imageUrl={item.imageUrl}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
