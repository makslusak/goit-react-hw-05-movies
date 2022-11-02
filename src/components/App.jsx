import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Section } from './Section/Section';
import { Container } from './Container/Container';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

const Home = lazy(() => import('pages/Home/Home'));
const Movies = lazy(() => import('pages/Movies/Movies'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));
const MoviePage = lazy(() => import('pages/MoviePage/MoviePage'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <>
      <Header />
      <Section>
        <Container>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:movieId" element={<MoviePage />}>
                <Route path="/movies/:movieId/cast" element={<Cast />} />
                <Route path="/movies/:movieId/reviews" element={<Reviews />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Container>
      </Section>
      <Footer />
    </>
  );
};
