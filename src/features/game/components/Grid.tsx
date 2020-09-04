import React, { useEffect } from "react";
import { Direction } from "../Game.types";
import "./Grid.css";

interface gridProps {
  grid: number[][];
  onKeyPress(d: Direction): void;
}

function Grid(props: gridProps) {
  const { grid, onKeyPress } = props;

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  const keyDownHandler = (e: KeyboardEvent) => {
    const supportedKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
    const directionByKey: {
      [eventCode: string]: Direction;
    } = {
      ArrowDown: "Down",
      ArrowUp: "Up",
      ArrowLeft: "Left",
      ArrowRight: "Right",
    };
    const isSupported = supportedKeys.some(
      (supportedKey) => supportedKey === e.code
    );
    if (isSupported) {
      onKeyPress(directionByKey[e.code]);
      e.preventDefault();
    }
  };

  return (
    <div className='grid'>
      {grid.map((line, index) => (
        <div className='line' key={"line" + index}>
          {line.map((cell, cellIndex) => (
            <div
              className={`cell cell-${cell}`}
              key={"line" + index + "cell" + cellIndex}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
