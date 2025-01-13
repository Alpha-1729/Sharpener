import React, { useState, useRef, useCallback, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import MoviesList from "./components/MoviesList";
import AddMovieForm from "./components/AddMovieForm";
import "./App.css";

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
      const response = await fetch("https://swapi.py4e.com/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong... Retrying");
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
      setIsRetrying(false);
      clearRetryInterval();
    } catch (error) {
      setError(error.message);
      setIsRetrying(true);
      if (!retryIntervalRef.current) {
        retryIntervalRef.current = setInterval(fetchMoviesHandler, 5000);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
    return () => clearRetryInterval();
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
    setError("Retrying cancelled by user");
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
        <AddMovieForm className=".add-form" />
      </section >
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {isRetrying && <button onClick={cancelRetryHandler}>Cancel</button>}
      </section>
      <section>
        {isLoading && <PuffLoader color="green" />}
        {!isLoading && content}
      </section>
    </React.Fragment >
  );
}

export default App;
