import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameService from '../../Services/GameService';
import Game from "../../Entities/Game"
import NavButton from '../../Components/NavButton/NavButton';

const GameListContainer = styled.div`
`;

const GameListItem = styled.div`
`;

const Title = styled.h2`
`;

const TopContainer = styled.div`
  display:flex;
  margin: 1.5em;
  border-bottom: 1px solid #555;
  justify-content: space-around;
`;

const GamesSearch = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const games = await GameService.searchAll();
      setGames(games);
    };
    fetchGames();
  }, []);

  return (
    <GameListContainer>
      <TopContainer>
        <Title>GameList</Title>
        <NavButton link={'/games/create'}>
            Create Game
        </NavButton>
      </TopContainer>
        {games.map(game => (
          <GameListItem key={game.id}>
            <h3>Game {game.id}</h3>
            <p>Creator: {game.creator.name}</p>
            <p>Question: {game.question}</p>
            <p>Answer: {game.answer}</p>
            <p>Coupon Code: {game.coupon.code}</p>
          </GameListItem>
        ))}
    </GameListContainer>
  );
};

export default GamesSearch