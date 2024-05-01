import styled from "styled-components";
import {useEffect, useState} from "react";

const Movies = props => {
  const { type } = props

  const [movies, setMovies] = useState([])

  // Data fetcing
  useEffect(() => {
    const async = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?language=ko-KR&page=1`,
        {
          method: 'GET',
          headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_API_JWT}`
          }
        }
      )
      const responseBody = await response.json()
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
const Movie = props => {
  const { movie } = props

  return (
    <MovieRoot>
      <div>
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
