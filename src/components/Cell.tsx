import React from 'react';
import { CellProps } from './interfaces';
import styled from 'styled-components';
import { mixColors } from '../utils/colorUtils';

const CellContainer = styled.div<{ isAlive: boolean; state: number; stateMax: number; color: string }>`
  width: 10px;
  height: 10px;
  background-color: ${({ state, stateMax, color }) =>
		mixColors('black', color, state / stateMax)};
  border: 0px solid #ddd;
`;

const Cell: React.FC<CellProps> = ({ isAlive, state, stateMax, color, onClick }) => (
	<CellContainer isAlive={isAlive} state={state} stateMax={stateMax} color={color} onClick={onClick} />
);

export default Cell;
