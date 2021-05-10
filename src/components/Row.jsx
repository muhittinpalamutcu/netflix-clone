import axios from "../axios";
import React, { useEffect, useState, useCallback } from "react";
import "./Row.css";

const Row = ({ title, fetchUrl, isLargeRow = false, search }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const updateInput = useCallback(
    (input) => {
      const filtered = movies.filter((movie) => {
        if (movie.name) {
          return movie.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        } else if (movie.original_title) {
          return (
            movie.original_title.toLowerCase().indexOf(input.toLowerCase()) >= 0
          );
        } else {
          return [];
        }
      });
      setFilteredMovies(filtered);
    },
    [movies]
  );

  useEffect(() => {
    if (movies.length > 0) {
      updateInput(search);
    }
  }, [movies, search, updateInput]);

  console.log(movies);

  console.log(search);

  return (
    <div className="row">
      <h3 style={{ marginLeft: "20px" }}>{title}</h3>
      <div className="row__posters">
        {search === ""
          ? movies.map((movie) => {
              return (
                ((isLargeRow && movie.poster_path) ||
                  (!isLargeRow && movie.backdrop_path)) && (
                  <img
                    className={`row__poster ${
                      isLargeRow && "row__posterLarge"
                    }`}
                    key={movie.id}
                    src={`${base_url}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                  />
                )
              );
            })
          : filteredMovies.map((movie) => {
              return (
                ((isLargeRow && movie.poster_path) ||
                  (!isLargeRow && movie.backdrop_path)) && (
                  <img
                    className={`row__poster ${
                      isLargeRow && "row__posterLarge"
                    }`}
                    key={movie.id}
                    src={`${base_url}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                  />
                )
              );
            })}
      </div>
    </div>
  );
};

export default Row;
