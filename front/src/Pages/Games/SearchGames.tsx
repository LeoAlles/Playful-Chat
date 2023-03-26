import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameService from '../../Services/GameService';
import Game from "../../Entities/Game"
import NavButton from '../../Components/NavButton/NavButton';
import LoginService from '../../Services/LoginService';

const GamesSearch = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  const [searchTerm, setSearchTerm] = useState("")
  const [onlyMine, setOnlyMine] = useState(false)

  useEffect(() => {
    const fetchGames = async () => {
      const games = await GameService.searchAll();
      setGames(games);
      setFilteredGames(games)
    };
    fetchGames();
  }, []);

  const handleOnlyMineChange = (event: any) => {
    setOnlyMine(!onlyMine);
  };

  useEffect(()=>{
    setFilteredGames(games.filter( g => {
      const mineId = LoginService.getLogged()?.id
      if(!mineId) return

      if(onlyMine)
        return g.question.match(searchTerm) && g.creator.id == mineId
      else 
        return g.question.match(searchTerm)
    }))
  },[searchTerm, onlyMine])

  return (
    <GameListContainer>
      <TopContainer>
        <Title>GameList</Title>
        <NavButton link={'/games/create'}>
            Create Game
        </NavButton>
      </TopContainer>
      <SearchContainer>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                />
                <label>
                    <Input
                        type="radio"
                        checked={onlyMine}
                        onClick={handleOnlyMineChange}
                    />
                    Only my Games                    
                </label>
            </SearchContainer>
        {filteredGames.map(game => (
          <GameListItem key={game.id}>
            <h3>Game {game.id}</h3>
            <FieldContainer>
              <Name>
                Creator
              </Name>
              <Value>
                {game.creator.name}
              </Value>
            </FieldContainer>
            <FieldContainer>
              <Name>
                Question
              </Name>
              <Value>
                {game.question}
              </Value>
            </FieldContainer>
            <FieldContainer>
              <Name>
                Answer
              </Name>
              <Value>
                {game.answer}
              </Value>
            </FieldContainer>
          </GameListItem>
        ))}
    </GameListContainer>
  );
};

export default GamesSearch


const GameListContainer = styled.div`
  margin: 0 20vw 0 20vw;
  max-width: 60vw;
`;

const GameListItem = styled.div`
  margin: 2em;
  background-color: #408E91;
  padding: 2em;
  box-shadow: 10px 10px 0px #ccc;
  border-radius: 5px;
`;

const Title = styled.h2`
`;

const TopContainer = styled.div`
  display:flex;
  padding: 1.5em 0 1.5em 0;
  border-bottom: 1px solid #555;
  justify-content: space-around;
`;

const FieldContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5em;
`

const Name = styled.div`
    text-align: left;
    font-weight: bold;
`

const Value = styled.div`
    text-align: right;
    font-style: italic;
`
const SearchContainer = styled.div`
  display:flex;
  padding: 1.5em;
  border-bottom: 1px solid #555;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  padding: 1em;
  font-size: 1.2em;
  border-radius: 0.5em;
`;