import React, { useState, useEffect, useCallback } from "react";
import AddMovies from "./AddMovies";

import "./App.css";
import MoviesList from "./MoviesList";

/* const fetchMovieHandler = () => {
  fetch("https://swapi.dev/api/films")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    });
}; */

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // caricamento fetch
  const [error, setError] = useState(null); //gestione errori 400

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // inizio ciclo try per vedere se la risposta è positiva, altrimenti entra 
    try {
      //fetch dell'url con chiamata asincrona per attendere la riposta
      const response = await fetch(
        "https://react-post-http-3dd7f-default-rtdb.firebaseio.com/movies.json"
      ); //fetch("https://swapi.dev/api/films");

      //check se risposta positiva, altrimenti crea nuovo errore
      if (!response.ok) {
        //.ok è un booleano, in questo caso non è ok
        throw new Error("Something went wrong!");
      }
      //attendo la risposta del json e la salvo in una costante
      const data = await response.json();
      //mi dichiaro array vuoto per ripopolare i miei movies
      const loadedMovies = [];

      //eseguo ciclio for per scorrrere tutte le key presenti nel mio data
      for (const key in data) {
        //inserisco push su un nuovo oggetto con tutte le proprietà richieste
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      /* const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      }); 
       setMovies(transformedMovies); */
      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      //viene preso da new Error()
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, []);

  let content = <p>Found no Movies :(</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  async function newMovie(movie) {
    const response = await fetch(
      "https://react-post-http-3dd7f-default-rtdb.firebaseio.com/movies.json",
      {
        //secondo argomento fetch, ci consente di settare i dati per inserim nel DB
        method: "POST",
        // firebase ottiene risorsa che deve essere memorizzata, la risorsa sarà un oggetto
        body: JSON.stringify(movie),
        headers: { "Content-type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <section>
        <AddMovies onNewMovie={newMovie} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
