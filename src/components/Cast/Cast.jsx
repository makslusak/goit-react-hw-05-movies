import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import { getCast } from '../../services/api';
import imagePlaceholder from '../../images/film-poster-placeholder.png';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getCast(movieId);
        setCast(responce.data.cast);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <ul>
      {cast?.map(actor => (
        <li>
          <img
            src={
              `https://image.tmdb.org/t/p/w300/${actor?.profile_path}` !==
              `https://image.tmdb.org/t/p/w300/null`
                ? `https://image.tmdb.org/t/p/w300/${actor?.profile_path}`
                : imagePlaceholder
            }
            alt=""
          />
          <p>{actor.name}</p>
          <p>{actor.character}</p>
        </li>
      ))}
    </ul>
  );
};
