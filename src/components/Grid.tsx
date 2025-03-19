import { useState } from 'react';
import { Cell } from './Cell.tsx';

interface Props {
  width: number;
  height: number;
}

export const Grid = ({ width, height }: Props) => {
  const [gridState, setGridState] = useState<number[][]>(Array(height).fill(Array(width).fill(1)));

  const getOnClickHandler = (rowIndex: number, cellIndex: number) => () => {
    setGridState((prevState) =>
      prevState.map((row, i) =>
        i === rowIndex ? row.map((cell) => cell + 1) : row.map((cell, j) => (j === cellIndex ? cell + 1 : cell))
      )
    );
  };

  return (
    <div className="flex flex-col gap-1">
      {gridState.map((row, rowIndex) => (
        <div className="flex gap-1" key={rowIndex}>
          {row.map((cellValue, cellIndex) => (
            <Cell key={`${rowIndex}-${cellIndex}`} value={cellValue} onClick={getOnClickHandler(rowIndex, cellIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
};
