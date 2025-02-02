export const countAliveNeighbors = (grid: any, x: number, y: number, numRows: number, numCols: number) => {
	const directions = [
		[0, 1], [1, 0], [0, -1], [-1, 0],
		[1, 1], [1, -1], [-1, 1], [-1, -1]
	];

	return directions.reduce((count, [dx, dy]) => {
		const newX = x + dx;
		const newY = y + dy;

		if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols && grid[newX][newY].isAlive) {
			return count + 1;
		}
		return count;
	}, 0);
};

export const createEmptyGrid = (numRows: number, numCols: number) => {
	return Array.from({ length: numRows }, () => Array(numCols).fill({ isAlive: false, state: 0 }));
};

export const createRandomGrid = (numRows: number, numCols: number, densityValue: number, statesValue: number) => {
	return Array.from({ length: numRows }, () =>
		Array.from({ length: numCols }, () => {
			const randomValue = Math.random() * 100;
			if (randomValue < densityValue) {
				return { isAlive: true, state: statesValue, stateMax: statesValue };
			} else {
				return { isAlive: false, state: 0 };
			}
		})
	);
};
