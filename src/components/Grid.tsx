import { useState } from 'react';
import { Cell } from './Cell.tsx';
import { Coordinates } from '../types/coordinates.ts';
import { useFibonacciCheck } from '../utils/use-fibonacci-check.ts';

interface Props {
  width: number;
  height: number;
}

export const HIGHLIGHT_TIMEOUT = 500;
export const DEFAULT_GRID_VALUE = 1;

export const Grid = ({ width, height }: Props) => {
  const [gridState, setGridState] = useState<number[][]>(Array(height).fill(Array(width).fill(DEFAULT_GRID_VALUE)));
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

  const { matchedCells } = useFibonacciCheck({ gridState, setGridState });

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
                matchedCells?.find(
                  ({ rowIndex: matchedRowIndex, cellIndex: matchedCellIndex }) =>
                    rowIndex === matchedRowIndex && cellIndex === matchedCellIndex
                )
                  ? 'green'
                  : clickedCell?.rowIndex === rowIndex || clickedCell?.cellIndex === cellIndex
                    ? 'yellow'
                    : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
