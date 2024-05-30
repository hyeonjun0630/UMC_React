import styled from "styled-components";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TMDB} from "../utils/TheMovieDatabaseApi.js";
import PropTypes from "prop-types";


const Movies = props => {
  // pagination에 유효한 값이 있으면(infinite 기반) 그걸 쓰고, 없으면 page기반 pagination을 사용
  // 마지막 export 참조
  const { type, pagination = "page" } = props
  const [page, setPage] = useState(1)

  const [movies, setMovies] = useState([])

  // { page, type, ... } 와 { page: page, type: type, ... } 는 같은 의미. 키와 값의 변수 이름이 같으면 축약할 수 있다.
  const childrenProps = { type, page, setPage, movies, setMovies }

  if (pagination === "page")
    return <PagerMovies { ...childrenProps }/>
  else // (pagination === "infinite-scroll")
    return <ScrollingMovies { ...childrenProps } />
}

Movies.propTypes = {
  type: PropTypes.string,
  pagination: PropTypes.string,
}

const MoviesChildrenPropTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  movies: PropTypes.array,
  type: PropTypes.string,
  setMovies: PropTypes.func
}

const PagerMovies = props => {
  const { page, setPage, movies, type, setMovies } = props

  // Page 전용 Data fetcing
  useEffect(() => {
    const async = async () => {
      const responseBody = await TMDB.get(`/movie/${type}?language=ko-KR&page=${page}`).then(it => it.json())
      setMovies(responseBody.results)
    }
    async().then()
  }, [type, page, setMovies]);

  return (
    <>
      <MoviesContainer>
        {movies.map((movie) => <Movie key={movie.id} movie={movie}/>)}
      </MoviesContainer>
      <Pager page={page} setPage={setPage} />
    </>
  )
}
PagerMovies.propTypes = MoviesChildrenPropTypes


const ScrollingMovies = props => {
  const { setPage, movies, type, setMovies, page } = props

  const onPageScroll = (event) => {
    // const element = document.getElementById("ASDF") 아래와 같은 코드
    const divElement = event.currentTarget
    // element === divElement // true

    const {
      scrollTop, // 위쪽 점 기준 스크롤 위치
      scrollHeight, // 전체 높이, 즉 예를 들면 1000
      offsetHeight  // 화면에 보이는 높이, 예를 들면 크롬 창 윈도우 높이에서 크롬의 헤더를 뺀 무언가.
    } = divElement

    const isFullyScrolled = Math.abs(Math.floor(scrollTop + offsetHeight) - scrollHeight) < 2 // 가장 아래까지 내리면 true

    if (isFullyScrolled)
      setPage(prev => prev + 1)
  }

  // Scroll 전용 Data fetcing
  useEffect(() => {
    const async = async () => {
      const responseBody = await TMDB.get(`/movie/${type}?language=ko-KR&page=${page}`).then(it => it.json())
      setMovies(prev => [...prev, ...responseBody.results])
      // ... 없으면 = [[{}, {}, {}], [{}, {}, {}]]
      // ... 있으면 = [{}, {}, {}, {}, {}, {}]
    }
    async().then()
  }, [type, page, setMovies]);

  return (
    <MoviesContainer onScroll={onPageScroll}/* id={"ASDF"}*/>
      {movies.map((movie) => <Movie key={movie.id} movie={movie}/>)}
    </MoviesContainer>
  )
}
ScrollingMovies.propTypes = MoviesChildrenPropTypes

const Pager = props => {
  // [page, setPage] 상태가 여기에 있으면 실제로 영화를 로드하는 Movies 컴포넌트에서
  // page 변수에 접근할 수 없다.
  // 위 Movie에 써줘야한다.

  return (
    <PagerRoot>
      <PagerArrow onClick={() => props.setPage(prev => Math.max(prev - 1, 1))}>&lt;</PagerArrow>
      <PagerIndex>{props.page ?? 1}</PagerIndex>
      <PagerArrow onClick={() => props.setPage(prev => prev + 1)}>&gt;</PagerArrow>
    </PagerRoot>
  )
}

Pager.propTypes = {
  setPage: PropTypes.func,
  page: PropTypes.number
}

// Movie와 Pager의 관계성을 C 스타일로 본다면...
// int Movies() {
//   int b = 0;
//   Pager(b);
// }

// void Pager(int aaa) {
//   int a = 0;
// }

const PagerRoot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #363636;
  color: white;
  padding: 16px 0;
`

const PagerArrow = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
`

const PagerIndex = styled.div`
  margin: 0 24px;
`

const MoviesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;

    padding: 10px 40px;
    
    flex-grow: 1;
    overflow: auto;
    
    background-color: #363636;

    @media (max-width: 580px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 460px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 360px) {
        grid-template-columns: repeat(1, 1fr);
    }
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

Movie.propTypes = { // 흑마술... 함부로 쓰지 말자
  movie: PropTypes.any
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
  export const NowPlayingMovies = () => <Movies type={"now_playing"} pagination={"infinite-scroll"}/>
  export const TopRatedMovies = () => <Movies type={"top_rated"}/>
