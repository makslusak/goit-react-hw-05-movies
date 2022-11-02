import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';
import { getByName } from '../../services/api';
import { FilmCard } from 'components/FilmCard/FilmCard';
import imagePlaceholder from '../../images/film-poster-placeholder.png';
import { useEffect } from 'react';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const query = searchParams.get('query') ?? '';
  // eslint-disable-next-line
  const [search, setSearch] = useState('');
  const [searchedFilms, setSearchedFilms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getByName(query, page);
        setSearchedFilms([...searchedFilms, ...responce.data.results]);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [page]);

  const handleInputChange = evt => {
    const { value } = evt.target;
    setSearch(value);
    setSearchParams({ query: value });
  };

  const handleSubmitForm = async evt => {
    evt.preventDefault();

    if (query === '') {
      return;
    }
    const responce = await getByName(query, 1);
    setTotalPages(responce.data.total_pages);
    setSearchedFilms(responce.data.results);
    setSearchParams({ query, page: 1 });
  };

  const handleLoadMore = async evt => {
    setSearchParams({ query, page: Number(page) + 1 });
  };
  console.log(error);
  return (
    <>
      <h2 className={css.title}>Movies</h2>
      <form className={css.form} onSubmit={handleSubmitForm}>
        <input
          onChange={handleInputChange}
          value={query}
          className={css.input}
          placeholder="Enter the name of the movie"
          type="text"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      {searchedFilms && (
        <>
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
          {totalPages > 1 && totalPages !== Number(page) && (
            <button
              className={css.buttonMore}
              onClick={handleLoadMore}
              type="button"
            >
              Load more
            </button>
          )}
        </>
      )}
    </>
  );
};
export default Movies;
