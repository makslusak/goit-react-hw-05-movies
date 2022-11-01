import css from './Home.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getTrendings } from '../../services/api';
import { FilmCard } from 'components/FilmCard/FilmCard';
import { Link } from 'react-router-dom';
import imagePlaceholder from '../../images/film-poster-placeholder.png';

export const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getTrendings();
        setTrendMovies(responce.data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h2>Trending Movies This WEEK</h2>
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
