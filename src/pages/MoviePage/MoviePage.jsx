import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import css from './MoviePage.module.css';
import { getMovieInfo } from '../../services/api';
import { useState } from 'react';
import imagePlaceholder from '../../images/film-poster-placeholder.png';

export const MoviePage = () => {
  const { movieId } = useParams();
  const [filmInfo, setFilmInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMovieInfo(movieId);
        setFilmInfo(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <img
          src={
            `https://image.tmdb.org/t/p/w300/${filmInfo?.poster_path}` !==
            `https://image.tmdb.org/t/p/w300/null`
              ? `https://image.tmdb.org/t/p/w300/${filmInfo?.poster_path}`
              : imagePlaceholder
          }
          alt={filmInfo?.title || filmInfo?.name}
        />
        <div>
          <div>
            <h2>{filmInfo?.title || filmInfo?.name}</h2>
            <p>{filmInfo?.tagline}</p>
            <p>{filmInfo?.overview}</p>
          </div>
          <div>
            <h3>Additional inforvation</h3>
            <ul>
              <li>
                <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
              </li>
              <li>
                <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
