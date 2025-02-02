import React from 'react';
import { GridProps } from './interfaces';
import Cell from './Cell';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(64, 10px);
  grid-template-rows: repeat(64, 10px);
  gap: 0px;
`;

const Grid: React.FC<GridProps> = ({ grid, toggleCellState, stateMax, color }) => (
	<GridContainer>
		{grid.map((row, rowIndex) =>
			row.map((cell, colIndex) => (
				<Cell
					key={`${rowIndex}-${colIndex}`}
					isAlive={cell.isAlive}
					state={cell.state}
					stateMax={stateMax}
					color={color}
					onClick={() => toggleCellState(rowIndex, colIndex)}
				/>
			))
		)}
	</GridContainer>
);

export default Grid;
