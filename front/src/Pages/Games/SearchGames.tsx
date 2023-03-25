import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameService from '../../Services/GameService';
import Game from "../../Entities/Game"

const GameListContainer = styled.div`
`;

const GameListItem = styled.li`
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
      <h2>Game List</h2>
      <ul>
        {games.map(game => (
          <GameListItem key={game.id}>
            <h3>Game {game.id}</h3>
            <p>Creator: {game.creator.name}</p>
            <p>Question: {game.question}</p>
            <p>Answer: {game.answer}</p>
            <p>Coupon Code: {game.coupon.code}</p>
          </GameListItem>
        ))}
      </ul>
    </GameListContainer>
  );
};

export default GamesSearch