import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Coordinates } from '../types/coordinates.ts';
import { DEFAULT_GRID_VALUE, HIGHLIGHT_TIMEOUT } from '../components/Grid.tsx';

const FIBONACCI_SEQUENCE_LENGTH = 5;

interface UseFibonacciCheck {
  gridState: number[][];
  setGridState: Dispatch<SetStateAction<number[][]>>;
}

const generateFibonacciSet = (maxValue: number): Set<number> => {
  const fibSet = new Set<number>();
  let a = 0,
    b = 1;
  while (a <= maxValue) {
    fibSet.add(a);
    [a, b] = [b, a + b];
  }
  return fibSet;
};

const isValidFibonacciSequence = (sequence: number[]): boolean => {
  if (sequence.length < FIBONACCI_SEQUENCE_LENGTH) return false;
  for (let i = 2; i < sequence.length; i++) {
    if (sequence[i] !== sequence[i - 1] + sequence[i - 2]) {
      return false;
    }
  }
  return true;
};

/**
 * This hook detects, clears and highlights Fibonacci sequences in the provided grid.
 *
 * It strictly follows the "pure" Fibonacci sequence, starting with 1, 1, 2, 3, 5, ...
 * Initially, I assumed that any two numbers can start a Fibonacci sequence, but I did
 * some research on the topic and found out that the first two numbers should be
 * (0, 1), (1, 1) or (1, 2). A sequence that starts with any two numbers is called a
 * Fibonacci-like (which is where my confusion probably came from) or Lucas sequence.
 *
 * Implementation overview:
 * 1. Find the maximum value in the grid and generate a Fibonacci sequence up to that value.
 * 2. Check for Fibonacci sequences in all directions.
 * 3. If a sequence is found, clear the cells and highlight them.
 */
export const useFibonacciCheck = ({ gridState, setGridState }: UseFibonacciCheck) => {
  const [matchedCells, setMatchedCells] = useState<Coordinates[] | null>(null);

  useEffect(() => {
    const matches = new Set<Coordinates>();

    const maxValue = Math.max(...gridState.flat());
    const fibonacciSet = generateFibonacciSet(maxValue);

    const checkSequence = (sequence: number[], index: number, isRow: boolean, reversed = false) => {
      for (let i = 0; i <= sequence.length - FIBONACCI_SEQUENCE_LENGTH; i++) {
        const slice = sequence.slice(i, i + FIBONACCI_SEQUENCE_LENGTH);

        if (slice.every((num) => fibonacciSet.has(num)) && isValidFibonacciSequence(slice)) {
          for (let j = 0; j < FIBONACCI_SEQUENCE_LENGTH; j++) {
            const actualIndex = reversed ? sequence.length - 1 - (i + j) : i + j;
            matches.add(
              isRow ? { rowIndex: index, cellIndex: actualIndex } : { rowIndex: actualIndex, cellIndex: index }
            );
          }
        }
      }
    };

    gridState.forEach((row, rowIndex) => {
      checkSequence(row, rowIndex, true, false);
      checkSequence([...row].reverse(), rowIndex, true, true);
    });

    for (let colIndex = 0; colIndex < gridState[0].length; colIndex++) {
      const column = gridState.map((row) => row[colIndex]);
      checkSequence(column, colIndex, false, false);
      checkSequence([...column].reverse(), colIndex, false, true);
    }

    if (matches.size > 0) {
      setGridState((prevGridState) => {
        const newGridState = prevGridState.map((row) => [...row]);

        matches.forEach(({ rowIndex, cellIndex }) => {
          newGridState[rowIndex][cellIndex] = DEFAULT_GRID_VALUE;
        });

        return newGridState;
      });

      setMatchedCells(Array.from(matches));
      setTimeout(() => setMatchedCells(null), HIGHLIGHT_TIMEOUT);
    }
  }, [gridState, setGridState]);

  return { matchedCells };
};
