export interface CellProps {
	isAlive: boolean;
	state: number;
	stateMax: number;
	color: string;
	onClick: () => void;
}

export interface GridProps {
	grid: { isAlive: boolean; state: number }[][];
	toggleCellState: (row: number, col: number) => void;
	stateMax: number;
	color: string;
}
