import { useState } from 'react';
import { createRandomGrid, createEmptyGrid } from '../utils/gridUtils';

export const useGridState = (numRows: number, numCols: number) => {
	const [statesValue, setStatesValue] = useState(1);
	const [densityValue, setDensityValue] = useState(20);
	const [intervalValue, setIntervalValue] = useState(100);
	const [isRunning, setIsRunning] = useState(false);

	const [grid, setGrid] = useState(() =>
		createRandomGrid(numRows, numCols, densityValue, statesValue)
	);

	const handleStatesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStatesValue(parseInt(event.target.value, 10));
		setGrid(createEmptyGrid(numRows, numCols));
	};

	const handleDensityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDensityValue(parseInt(event.target.value, 10));
	};

	const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIntervalValue(parseInt(event.target.value, 10));
	};

	const toggleCellState = (row: number, col: number) => {
		if (isRunning) return;

		const newGrid = grid.map((r, rowIndex) =>
			r.map((cell, colIndex) => {
				if (rowIndex === row && colIndex === col) {
					if (cell.isAlive) {
						return { ...cell, isAlive: false, state: cell.state - 1 };
					} else if (cell.state > 0) {
						return { ...cell, state: cell.state - 1 };
					} else {
						return { ...cell, isAlive: true, state: statesValue };
					}
				}
				return cell;
			})
		);
		setGrid(newGrid);
	};

	return {
		grid,
		setGrid,
		statesValue,
		setStatesValue,
		densityValue,
		setDensityValue,
		intervalValue,
		setIntervalValue,
		isRunning,
		setIsRunning,
		handleStatesChange,
		handleDensityChange,
		handleIntervalChange,
		toggleCellState,
	};
};
