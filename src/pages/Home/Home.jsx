import css from './Home.module.css';
import { useEffect, useState } from 'react';
import { getTrendings, getTrendingsDay } from '../../services/api';
import { FilmCard } from 'components/FilmCard/FilmCard';
import { Link } from 'react-router-dom';
import imagePlaceholder from '../../images/film-poster-placeholder.png';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [dayTrends, setDayTrends] = useState([]);
  const [error, setError] = useState('');

  const topTen = arr => {
    const sortedTrends = arr
      .sort(
        (firstFilm, secondFilmt) =>
          firstFilm.vote_average - secondFilmt.vote_average
      )
      .slice(0, 10);
    return sortedTrends;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getTrendings();
        setTrendMovies(responce.data.results);
      } catch (error) {
        setError(error);
      }
    };

    const fetchTrendDay = async () => {
      try {
        const responce = await getTrendingsDay();

        setDayTrends(topTen(responce.data.results));
      } catch (error) {
        setError(error);
      }
    };
    fetchTrendDay();
    fetchData();
    // eslint-disable-next-line
  }, []);
  console.log(error);
  return (
    <>
      <h2 className={css.title}>Today's top 10 movies</h2>
      <ul className={css.dayTop}>
        {dayTrends.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} className={css.item}>
              <img
                className={css.dayImage}
                src={
                  `https://image.tmdb.org/t/p/w300/${movie.poster_path}` !==
                  `https://image.tmdb.org/t/p/w300/null`
                    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                    : imagePlaceholder
                }
                alt={movie.title || movie.name}
              />
            </Link>
          </li>
        ))}
      </ul>
      <h2 className={css.title}>Trending this week</h2>
      <ul className={css.filmList}>
        {trendMovies.map(movie => (
          <FilmCard
            key={movie.id}
            id={movie.id}
            image={
              `https://image.tmdb.org/t/p/w300/${movie.poster_path}` !==
              `https://image.tmdb.org/t/p/w300/null`
                ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                : imagePlaceholder
            }
            title={movie.title || movie.name}
            rating={movie.vote_average}
          />
        ))}
      </ul>
    </>
  );
};
export default Home;
