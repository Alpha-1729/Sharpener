import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = ({ movies, onDelete }) => {
  return (
    <ul className={classes['movies-list']}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDelete={() => { onDelete(movie.id) }}
        />
      ))}
    </ul>
  );
};

export default MovieList;
