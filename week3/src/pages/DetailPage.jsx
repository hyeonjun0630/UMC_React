import {useLocation} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {TMDB} from "../utils/TheMovieDatabaseApi.js";

const Background = styled.div`
  width: 100%;
  background: ${({ background }) => `url(${background})`};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
  overflow: auto;
`;

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(26, 15, 114, 0.8); /* 배경색과 투명도 조절 */
  @media (max-width: 580px) {
    flex-wrap: wrap;
  }
`;

const PosterImage = styled.img`
  width: 400px;
  height: 600px;
`;

const Information = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 50px;
  @media (max-width: 580px) {
    margin-left: 0;
    width: 80%;
  }
`;

const Cast = styled.div`
    padding: 20px;
    width: 100%;
    @media (max-width: 580px) {
        margin-left: 0;
        width: 80%;
    }
`;

const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 10px;
  @media (max-width: 1130px) and (min-width: 990px){
    grid-template-columns: repeat(8, 1fr);
  }
  @media (max-width: 990px) and (min-width: 580px){
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 580px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ActorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActorImage = styled.img`
  width: 100px;
  height: 150px;
  border-radius: 20px;
`;


const DetailPage = () => {
  // 현재 주소값을 받아오기
  // path state (navigate)
  // pathname에 id가 아니라 /movie/${id} 가 들어있습니다. 따라서 앞의 '/movie/' 를 지워야 진짜 ID가 됨.
  const { state: data, pathname } = useLocation();
  const id = pathname.replace("/movie/", "")

  // detail에 영화 관련 다양한 정보들이 들어있습니다.
  // 오브젝트 정의는 아래 두 API 가 응답하는 것들의 합집합입니다.
  // https://developer.themoviedb.org/reference/movie-details
  // https://developer.themoviedb.org/reference/movie-credits

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const _detail = await TMDB.get(`/movie/${id}`).then((res) => res.json());
      const _casting = await TMDB.get(`/movie/${id}/credits`).then((res) =>
        res.json()
      );
      setDetail({ ..._detail, ..._casting });
    };
    fetchData();
  }, [id]);

  return (
    <Background
      background={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
    >
      <Container>
        <PosterImage
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          alt={data.title}
        />
        <Information>
          <h1>| {data.title}</h1>
          <h3>평점 {"⭐️".repeat(Math.floor(data.vote_average))}</h3>
          <h3>개봉일 {data.release_date}</h3>
          <h3>줄거리</h3>
          <div>
            {data.overview
              ? data.overview
              : "TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다."}
          </div>
        </Information>
      </Container>
      <Container>
        <Cast>
          <h3>출연진</h3>
          <CastGrid>
            {detail &&
              detail.cast.map((actor, index) => (
                <ActorCard key={index}>
                  <ActorImage
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    // alt={actor.name}
                  />
                  <p>{actor.name}</p>
                </ActorCard>
              ))}
          </CastGrid>
        </Cast>
      </Container>
    </Background>
  );
};

export default DetailPage;
