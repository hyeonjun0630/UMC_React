import styled from "styled-components";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TMDB} from "../utils/TheMovieDatabaseApi.js";


const Movies = props => {
  const { type } = props

  const [movies, setMovies] = useState([])

  // Data fetcing
  useEffect(() => {
    const async = async () => {
      const responseBody = await TMDB.get(`/movie/${type}?language=ko-KR&page=1`).then(it => it.json())
      setMovies(responseBody.results)
    }
    async().then()
  }, [type]);

  return (
    <MoviesContainer>
      {movies.map((movie, index) => <Movie key={index} movie={movie}/>)}
    </MoviesContainer>
  )
}

const MoviesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;

    padding: 10px 40px;
    
    flex-grow: 1;
    overflow: auto;
    
    background-color: #363636;
`

// 이 컴포넌트의 내용의 위의 .map 함수의 내용으로 치환됩니다.
export const Movie = props => {
  const {movie} = props

  const navigate = useNavigate()

  const handleClick = (movie) => {
    navigate(`/movie/${movie.id}`, { // 영화 이름 같으면? 아이디로 구분해야한다.
      state: {
        poster_path: movie.poster_path,
        title: movie.title,
        overview: movie.overview,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        backdrop_path: movie.backdrop_path,
      }
    })
  };

  return (
    <MovieRoot>
      {/* 이 코드 한줄로 포스터 클릭 시 상세페이지로 넘어가는 것 구현.*/}
      <div onClick={() => handleClick(movie)}>
        <MovieOverview>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </MovieOverview>

        <MoviePosterContainer>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </MoviePosterContainer>

        <MovieData>
          <div>{movie.title}</div>
          <div>{movie.vote_average}</div>
        </MovieData>
      </div>

    </MovieRoot>
  )
}

const MoviePosterContainer = styled.div``

const MovieOverview = styled.div`
      position: absolute;
      display: none;
      color: white;
      padding: 20px;
      z-index: 999;
      word-wrap: break-word;

      /* .movie-overview > p 와 동일한 문장 */

      & > p {
          font-size: small;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 10;
      }
  `

const MovieRoot = styled.div`
      background-color: black;
      padding: 10px;
      position: relative;

      /* .content-container:hover .movie-poster-container 와 같은 문장 */

      &:hover ${MoviePosterContainer} {
          opacity: 0.3;
      }

      &:hover ${MovieOverview} {
          display: block;
      }
  `

const MovieData = styled.div`
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 50px;
  `

const MoviePoster = styled.img`
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    z-index: 1;
`

  export const PopularMovies = () => <Movies type={"popular"}/>
  export const UpcomingMovies = () => <Movies type={"upcoming"}/>
  export const NowPlayingMovies = () => <Movies type={"now_playing"}/>
  export const TopRatedMovies = () => <Movies type={"top_rated"}/>
