import React from "react";
import Movies from "./Movies";
import classes from "./MovieList.module.css";

const MoviesList = (props) => {
  return (
    <>
      {props.movies.map((el) => {
        return (
          <ul key={el.id}>
            <li className={classes["movies-list"]}>
              <Movies
                title={el.title}
                text={el.openingText}
                date={el.releaseDate}
              />
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default MoviesList;
