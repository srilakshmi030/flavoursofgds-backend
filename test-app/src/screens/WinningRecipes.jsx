import { Link, useParams } from 'react-router-dom';
import { CircleUserRound, Star } from 'lucide-react';
import ScreenHero from '../components/ScreenHero';
import StateView from '../components/StateView';
import Thumb from '../components/Thumb';
import { api } from '../api/client';
import { useApi } from '../hooks/useApi';
import './WinningRecipes.css';

export default function WinningRecipes() {
  const { cityCode } = useParams();
  const { data, error, isLoading } = useApi(() => api.winningRecipes(cityCode), [cityCode]);

  if (isLoading) return <StateView status="loading" />;
  if (error) return <StateView status="error" message={error.message} />;

  const recipes = data?.winningRecipes || [];

  return (
    <div>
      <ScreenHero
        title="Top 3 winning Recipes"
        description={`The recipes that took the top three places in ${data.cityName}.`}
      />

      <div className="screen-body">
        <ul className="stack reset-list">
          {recipes.map((recipe, index) => (
            <li key={recipe.id}>
              <Link to={`/item/recipes/${recipe.id}`} className="winner-card">
                <Thumb src={recipe.imageUrl} alt={recipe.name} size="sm" />

                <div className="winner-card__body">
                  <div className="winner-card__head">
                    <h2 className="winner-card__title" title={recipe.name}>
                      {recipe.name}
                    </h2>
                    <span className="winner-card__badge">
                      <Star size={16} strokeWidth={1.75} aria-hidden="true" />
                      {`#0${index + 1}`}
                    </span>
                  </div>

                  <p className="winner-card__description">{recipe.shortDescription}</p>

                  <p className="winner-card__chef">
                    <CircleUserRound size={16} strokeWidth={1.75} aria-hidden="true" />
                    {recipe.contributor}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
