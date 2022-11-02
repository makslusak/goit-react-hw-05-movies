import { Link, useLocation } from 'react-router-dom';
import css from './FilmCard.module.css';


export const FilmCard = ({ image, title, rating, id }) => {
  const location = useLocation();
  return (
    <li>
      <Link
        state={{ from: location }}
        to={`/movies/${id}`}
        className={css.item}
      >
        <img className={css.image} src={image} alt={title} />
        <div className={css.wrapper}>
          <h3 className={css.title}>{title}</h3>
          <p className={css.rating}>
            Rating: <span>{rating}</span>
          </p>
        </div>
      </Link>
    </li>
  );
};
