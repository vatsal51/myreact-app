"use client";
import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "../pagination";
import Genre from "../Genre";
import useGenre from "../useGenre";
import CardLayout from "../CardLayout";

const Movie = () => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [value, setValue] = useState([]);
  const genreURL = useGenre(value);

  const fetchMovies = async () => {
    const data = await fetch(`
      
    https://api.themoviedb.org/3/discover/movie?api_key=6b99f46cc249aa0e4664f52a5c266bb4&include_adult=false&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreURL}`);

    // https://api.themoviedb.org/3/movie/popular?api_key=6b99f46cc249aa0e4664f52a5c266bb4&page=${page}&with_genres=${genreURL}`);
    // https://api.themoviedb.org/3/discover/tv?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
    const dataJ = await data.json();
    setState(dataJ.results);
    localStorage.setItem("MoviesData", JSON.stringify(dataJ.results));
    console.log("movie");
  };
  useEffect(() => {
    const storedData = localStorage.getItem("MoviesData");
    if (storedData) {
      setState(JSON.parse(storedData));
    } else {
      fetchMovies();
    }
  }, [page, genreURL]);

  return (
    <>
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
            Movies
          </div>
          <Genre
            genre={genre}
            setGenre={setGenre}
            setPage={setPage}
            type="movie"
            value={value}
            setValue={setValue}
          />
          <CardLayout state={state} href="/movies/moviesdetails" />

          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
};

export default Movie;
