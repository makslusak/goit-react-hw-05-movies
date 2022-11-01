import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import css from './Movies.module.css';
import { getByName } from '../../services/api';
import { FilmCard } from 'components/FilmCard/FilmCard';
import imagePlaceholder from '../../images/film-poster-placeholder.png';

export const Movies = () => {
  const [search, setSearch] = useState('');
  const [searchedFilms, setSearchedFilms] = useState(null);

  const handleInputChange = evt => {
    setSearch(evt.target.value);
  };

  const handleSubmitForm = async evt => {
    evt.preventDefault();
    const responce = await getByName(search, 1);
    setSearchedFilms(responce.data.results);
    console.log(responce.data.results);
  };

  return (
    <>
      <h2>Movies</h2>
      <form onSubmit={handleSubmitForm}>
        <input
          onChange={handleInputChange}
          value={search}
          className={css.input}
          placeholder="Enter the name of the movie"
          type="text"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      {searchedFilms && (
        <ul className={css.filmList}>
          {searchedFilms.map(movie => (
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
      )}
    </>
  );
};
