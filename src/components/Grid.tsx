import { useState } from 'react';
import { Cell } from './Cell.tsx';

interface Props {
  width: number;
  height: number;
}

export const Grid = ({ width, height }: Props) => {
  const [gridState, setGridState] = useState<number[][]>(Array(height).fill(Array(width).fill(1)));

  return (
    <div className="flex flex-col gap-1">
      {gridState.map((row, rowIndex) => (
        <div className="flex gap-1" key={rowIndex}>
          {row.map((cellValue, cellIndex) => (
            <Cell key={`${rowIndex}-${cellIndex}`} value={cellValue} />
          ))}
        </div>
      ))}
    </div>
  );
};
