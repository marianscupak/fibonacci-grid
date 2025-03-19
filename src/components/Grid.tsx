import { useState } from 'react';
import { Cell } from './Cell.tsx';

interface Coordinates {
  rowIndex: number;
  cellIndex: number;
}

interface Props {
  width: number;
  height: number;
}

const HIGHLIGHT_TIMEOUT = 500;

export const Grid = ({ width, height }: Props) => {
  const [gridState, setGridState] = useState<number[][]>(Array(height).fill(Array(width).fill(1)));
  const [clickedCell, setClickedCell] = useState<Coordinates | null>(null);

  const getOnClickHandler = (rowIndex: number, cellIndex: number) => () => {
    setGridState((prevState) =>
      prevState.map((row, i) =>
        i === rowIndex ? row.map((cell) => cell + 1) : row.map((cell, j) => (j === cellIndex ? cell + 1 : cell))
      )
    );

    setClickedCell({ rowIndex, cellIndex });
    setTimeout(() => setClickedCell(null), HIGHLIGHT_TIMEOUT);
  };

  return (
    <div className="flex flex-col gap-1">
      {gridState.map((row, rowIndex) => (
        <div className="flex gap-1" key={rowIndex}>
          {row.map((cellValue, cellIndex) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              value={cellValue}
              onClick={getOnClickHandler(rowIndex, cellIndex)}
              backgroundColor={
                clickedCell?.rowIndex === rowIndex || clickedCell?.cellIndex === cellIndex ? 'yellow' : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
