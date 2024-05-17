// 인트로 사이트
import styled from "styled-components";
import {useCallback, useEffect, useState} from "react";
import {Movie} from "./Movies.jsx";

export const Intro = () => {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)

  const search = useCallback(async () => {
    if (!query) return

    setSearching(true)
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          "accept": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_API_JWT}`
        }
      }
    )
    const responseBody = await response.json()
    setSearchResults(responseBody.results)
    setSearching(false)
  }, [query])

  useEffect(() => {
    const timeout = setTimeout(() => search(), 300)
    return () => clearTimeout(timeout)
  }, [search]);

  // Effect! asd
  // (f 를 입력)
  // Clear!
  // Effect! asdf

  // useEffect(() => {
  //   console.log(`Effect!, ${query}`)
  //   return () => console.log("Clear!")
  // }, [query])

  return (
    <>
      <IntroContent>환영합니다</IntroContent>
      <Back>
        <BackContent>🎬 Find your movies!</BackContent>
        <TextBox onChange={(event) => setQuery(event.target.value)}></TextBox>
        {searching ?
          <>검색 중입니다.</> :
          <SearchResultsContainer>
            {searchResults.map((movie, index) => <Movie key={index} movie={movie}/>)}
          </SearchResultsContainer>
        }
      </Back>
    </>
  )
}

const SearchResultsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;

    padding: 10px 40px;

    flex-grow: 1;
    overflow: auto;
    min-height: 0;
`

const IntroContent = styled.div`
    font-weight: bold;
    font-size: x-large;
    height: 10em;
    color: white;
    background-color: black;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`

const Back = styled.div`
    width: 100%;
    height: 100%;
    background-color: #272727;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
 `

const BackContent = styled.div`
    color: #ffffff;
    text-align: center;
    margin: 50px;
    font-size: xx-large;
    font-weight: bold;
`

const TextBox = styled.input`
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    align-self: center;

    &:focus {
        border-color: #6495ed;
    }
`