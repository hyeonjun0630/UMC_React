// import React from "react";
import { movies } from "./movieData";
import "./Movie.css";

function Movie() {
  return (
    <div className="background">
      <h1 className="header-title">Movies</h1>
      <hr />
      <div className="movie-container">
        {movies.results.map((movie, index) => (
          <div key={index} className="content-container">
            <div>
              <div className="movie-overview">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>

              <div className="movie-poster-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </div>

              <div className="movie-data">
                <div>{movie.title}</div>
                <div>{movie.vote_average}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movie;

// 1번줄 import React 에러발생.
// 빠른 수정을 참고하여 삭제처리.
// 정상동작 확인.

// 텍스트 오버플로우 해결하기
