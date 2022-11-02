import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  Link,
} from 'react-router-dom';
import { useEffect } from 'react';
import css from './MoviePage.module.css';
import { getMovieInfo } from '../../services/api';
import { useState } from 'react';
import imagePlaceholder from '../../images/film-poster-placeholder.png';

const MoviePage = () => {
  const { movieId } = useParams();
  const [filmInfo, setFilmInfo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMovieInfo(movieId);
        setFilmInfo(data);
      } catch (error) {}
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Link className={css.goBack} to={location.state?.from ?? '/'}>
        Go back
      </Link>
      <div className={css.wrapper}>
        <img
          src={
            `https://image.tmdb.org/t/p/w300/${filmInfo?.poster_path}` !==
            `https://image.tmdb.org/t/p/w300/null`
              ? `https://image.tmdb.org/t/p/w300/${filmInfo?.poster_path}`
              : imagePlaceholder
          }
          alt={filmInfo?.title || filmInfo?.name}
        />
        <div className={css.cont}>
          <div className={css.box}>
            <h2 className={css.title}>{filmInfo?.title || filmInfo?.name}</h2>
            <p>{filmInfo?.tagline}</p>
            <p>{filmInfo?.overview}</p>
          </div>
          <div className={css.additional}>
            <h3>Additional information</h3>
            <ul>
              <li>
                <NavLink className={css.link} to={`/movies/${movieId}/cast`}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink className={css.link} to={`/movies/${movieId}/reviews`}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default MoviePage;
