import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PuffLoader } from 'react-spinners';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const retryIntervalRef = useRef(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.py4e.com/api/films');
      if (!response.ok) {
        throw new Error('Something went wrong... Retrying');
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedMovies);
      setIsRetrying(false); // Stop retrying on success
      clearRetryInterval(); // Clear any retry interval
    } catch (error) {
      setError(error.message);
      setIsRetrying(true);
      if (!retryIntervalRef.current) {
        retryIntervalRef.current = setInterval(fetchMoviesHandler, 5000); // Retry every 5 seconds
      }
    }
    setIsLoading(false);
  }, []); // Stable dependency array

  useEffect(() => {
    fetchMoviesHandler();
    return () => clearRetryInterval(); // Clean up retry interval on unmount
  }, [fetchMoviesHandler]);

  function clearRetryInterval() {
    if (retryIntervalRef.current) {
      clearInterval(retryIntervalRef.current);
      retryIntervalRef.current = null;
    }
  }

  function cancelRetryHandler() {
    clearRetryInterval();
    setIsRetrying(false);
    setError('Retrying cancelled by user');
  }

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {isRetrying && <button onClick={cancelRetryHandler}>Cancel</button>}
      </section>
      <section>
        {isLoading && <PuffLoader color="green" />}
        {!isLoading && content}
      </section>
    </React.Fragment>
  );
}

export default App;
