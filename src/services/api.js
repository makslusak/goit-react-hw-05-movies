import axios from 'axios';

const API_KEY = '087b3a8cac1b0930cef8c04cbd521bfb';

export const getTrendings = async () => {
  const responce = await axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
  );
  return responce;
};

export const getByName = async (query, page) => {
  const responce = await axios.get(
    `
https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  return responce;
};

export const getMovieInfo = async movieId => {
  const responce = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return responce;
};

export const getReviews = async movieId => {
  const responce = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return responce;
};

export const getCast = async movieId => {
  const responce = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return responce;
};
