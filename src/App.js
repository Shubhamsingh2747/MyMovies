import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponents";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "abe179ca";

/////////////////////////////////////PROPERTIES///////////////////////////////
const Container = styled.div`
  display:flex;
  flex-direction: column;
`;

const Header = styled.div`
  display:flex;
  flex-direction: row;
  background-color: black;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`; 

const Appname = styled.div`
  display:flex;
  flex-direction:row;
  align-items: center;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 7px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color:white;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color:black;
  font-size: 16px;
  font-weight: bold;
  border:none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap:24px;
  justify-content: space-evenly;
`
////////////////////////////////// UI INITIATED FROM THIS PART /////////////////////////////////
function App() {

  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  //////////////////////////////API CALL////////////////////////////////////////////////
  const fetchdata = async (searchString) =>{
    const response= await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    console.log(response);
    updateMovieList(response.data.Search)
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout=setTimeout(()=> fetchdata(event.target.value),500);
    updateTimeoutId(timeout);
  };

  return (
    <Container className="App" >

      <Header>
        <Appname> MyMovies</Appname>
        <SearchBox>
          <SearchIcon src="/search-icon.svg"></SearchIcon>
          <SearchInput placeholder="Search movies..." value={searchQuery} onChange={onTextChange}/>
        </SearchBox>
      </Header>

      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}

      <MovieListContainer>
        {movieList?.length? movieList.map((movie, index)=><MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>):"No searches yet"}
      </MovieListContainer>


    </Container>
  );
}

export default App;
