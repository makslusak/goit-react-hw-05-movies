import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import { getCast } from '../../services/api';
import imagePlaceholder from '../../images/film-poster-placeholder.png';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getCast(movieId);
        setCast(responce.data.cast);
      } catch (error) {}
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {cast.length > 0 ? (
        <ul className={css.list}>
          {cast?.map(actor => (
            <li className={css.item} key={actor.id}>
              <img
                className={css.image}
                src={
                  `https://image.tmdb.org/t/p/w300/${actor?.profile_path}` !==
                  `https://image.tmdb.org/t/p/w300/null`
                    ? `https://image.tmdb.org/t/p/w300/${actor?.profile_path}`
                    : imagePlaceholder
                }
                alt=""
              />
              <div className={css.box}>
                <p className={css.title}>{actor.name}</p>
                <p>{actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry, we did not find information about the actors of this film.</p>
      )}
    </>
  );
};
export default Cast;
