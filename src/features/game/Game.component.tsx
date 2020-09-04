import React, { useState } from "react";
import Grid from "./components/Grid";
import { Direction } from "./Game.types";

import { useMutation, useQuery } from "@apollo/client";

import { PROCESS_GAME, NEW_GAME } from "./Game.queries";

function Game() {
  const defaultGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [grid, setGrid] = useState<number[][]>(defaultGrid);

  const { loading } = useQuery(NEW_GAME, {
    onCompleted: (data) => {
      setGrid(data.newGame.state);
      setScore(data.newGame.score);
    },
  });

  const [processGame] = useMutation(PROCESS_GAME, {
    onCompleted: (data) => {
      setGrid(data.processGame.state);
      setScore(data.processGame.score);
      if (data.processGame.finished) {
        setIsFinished(true);
        // Make mutation to post player`s score ...
      }
    },
  });

  const onKeyPress = (direction: Direction) => {
    processGame({
      variables: {
        game: {
          direction,
          state: grid,
          score,
        },
      },
    });
  };
  return (
    <div className='game'>
      <h3>Score: {score}</h3>
      <Grid grid={grid} onKeyPress={onKeyPress} />
      {loading && <p>Loading...</p>}
      {isFinished && <h2>Finished! Your score: {`${score}`}</h2>}
    </div>
  );
}

export default Game;
