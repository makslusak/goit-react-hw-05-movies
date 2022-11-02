import React from 'react';
import css from './Footer.module.css';
import { Container } from '../Container/Container';

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container>
        <p className={css.text}>
          Made by Max Lusak as part of the GoIt curriculum using themoviedb API
        </p>
      </Container>
    </footer>
  );
};
