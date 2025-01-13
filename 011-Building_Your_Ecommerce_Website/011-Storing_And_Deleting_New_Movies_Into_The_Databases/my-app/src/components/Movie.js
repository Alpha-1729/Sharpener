import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './Movie.module.css';

const Movie = ({ title, releaseDate, openingText, onDelete }) => {
  return (
    <li className={classes.movie}>
      <h2>{title}</h2>
      <h3>{releaseDate}</h3>
      <p>{openingText}</p>
      <Button className={classes.deleteButton} onClick={onDelete}>Delete</Button>
    </li>
  );
};

export default Movie;
