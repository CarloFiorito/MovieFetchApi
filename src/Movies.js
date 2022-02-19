import React from "react";
import classes from "./Movie.module.css";
const Movies = (props) => {
  return (
    <div className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.date}</h3>
      <p>{props.text}</p>
    </div>
  );
};

export default Movies;
