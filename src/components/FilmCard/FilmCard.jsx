import { Link } from 'react-router-dom';
import css from './FilmCard.module.css';
import { useParams } from 'react-router-dom';

export const FilmCard = ({ image, title, rating, id }) => {
  return (
    <li>
      <Link to={`/movies/${id}`} className={css.item}>
        <img className={css.image} src={image} alt={title} />
        <h3 className={css.title}>{title}</h3>
        <p className={css.rating}>Rating {rating}</p>
      </Link>
    </li>
  );
};
