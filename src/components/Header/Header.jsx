import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import { Container } from '../Container/Container';

export const Header = () => {
  return (
    <header className={css.header}>
      <Container>
        <nav>
          <ul className={css.list}>
            <li>
              <NavLink className={css.link} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={css.link} to="/movies">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
