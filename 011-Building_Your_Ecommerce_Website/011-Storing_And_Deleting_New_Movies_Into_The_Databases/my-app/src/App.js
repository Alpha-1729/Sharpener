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
            const response = await fetch("https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json");
            if (!response.ok) {
                throw new Error("Something went wrong... Retrying");
            }
            const data = await response.json();

            const loadedMovies = [];

            for (const key in data) {
                loadedMovies.push({
                    id: key,
                    title: data[key].title,
                    openingText: data[key].opening_crawl,
                    releaseDate: data[key].releaseDate,
                });
            }

            setMovies(loadedMovies);
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

    // Add Movie Handler
    async function addMovieHandler(movie) {
        const response = await fetch('https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // After the movie is added, reload the list of movies
        fetchMoviesHandler();
    }

    async function deleteMovieHandler(movieId) {
        const response = await fetch(`https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${movieId}.json`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            setError("Failed to delete movie.");
            return;
        }

        // After deleting, re-fetch the updated list of movies
        fetchMoviesHandler();
    }

    let content = <p>Found no movies</p>;

    if (movies.length > 0) {
        content = <MoviesList movies={movies} onDelete={deleteMovieHandler} />;
    }
    if (error) {
        content = <p>{error}</p>;
    }

    return (
        <React.Fragment>
            <section className="add-form">
                <AddMovieForm onAddMovie={addMovieHandler} />
            </section>
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
