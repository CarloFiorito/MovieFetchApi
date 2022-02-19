import classes from "./addMovies.module.css";
import React, { useState, useRef } from "react";
const AddMovies = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
    const movie = {
      title: titleRef.current.value,
      releaseDate: releaseDateRef.current.value,
      openingText: openingTextRef.current.value,
    };
    props.onNewMovie(movie);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Titolo Film:</label>
        <input id="title" ref={titleRef} type="text" />
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Data di rilascio:</label>
        <input id="date" ref={releaseDateRef} type="text" />
      </div>
      <div className={classes.control}>
        <label htmlFor="textarea">Descrizione Film</label>
        <textarea id="text" ref={openingTextRef}></textarea>
      </div>

      <button>Add Movie</button>
    </form>
  );
};

export default AddMovies;
