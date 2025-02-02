import * as React from 'react';
import { useAppState } from './state/useAppState';
import { useGridState } from './state/useGridState';
import { createEmptyGrid, countAliveNeighbors, createRandomGrid } from './utils/gridUtils';
import { createRoot } from 'react-dom/client';
import { Grid, presets } from './components';
import {
	AppContainer, ControlContainer, RuleContainer, ConfigContainer, PresetContainer, PresetButtonContainer,
	ConfigLabel, BornContainer, SurviveContainer, StatesContainer, DensityContainer, IntervalContainer,
	Button, Label, Checkbox, Slider
} from './styles';

const App: React.FC = () => {
	const {
		selectedBornNumbers, setSelectedBornNumbers,
		selectedSurviveNumbers, setSelectedSurviveNumbers,
		isRunning, setIsRunning
	} = useAppState();

	const numRows = 64;
	const numCols = 64;
	const color = "#5e85ce";
	const {
		grid, setGrid,
		statesValue, setStatesValue,
		densityValue,
		intervalValue,
		handleStatesChange, handleDensityChange,
		handleIntervalChange, toggleCellState
	} = useGridState(numRows, numCols);

	const handleCheckboxBornChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value, 10);
		const newSelectedBornNumbers = event.target.checked
			? [...selectedBornNumbers, value]
			: selectedBornNumbers.filter(num => num !== value);
		setSelectedBornNumbers(newSelectedBornNumbers);
	};

	const handleCheckboxSurviveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value, 10);
		const newSelectedSurviveNumbers = event.target.checked
			? [...selectedSurviveNumbers, value]
			: selectedSurviveNumbers.filter(num => num !== value);
		setSelectedSurviveNumbers(newSelectedSurviveNumbers);
	};

	const updateGrid = () => {
		setGrid(prevGrid =>
			prevGrid.map((row, rowIndex) =>
				row.map((cell, colIndex) => {
					const aliveNeighbors = countAliveNeighbors(prevGrid, rowIndex, colIndex, numRows, numCols);
					if (cell.isAlive) {
						if (selectedSurviveNumbers.includes(aliveNeighbors)) {
							return { ...cell };
						} else {
							return { ...cell, isAlive: false, state: cell.state - 1 };
						}
					} else {
						if (selectedBornNumbers.includes(aliveNeighbors) && cell.state == 0) {
							return { ...cell, isAlive: true, state: statesValue };
						} else if (cell.state > 0) {
							return { ...cell, state: cell.state - 1 };
						}
					}
					return cell;
				})
			)
		);
	};

	React.useEffect(() => {
		if (isRunning) {
			// Check if all cell states are zero
			const allCellsStateZero = grid.every(row => row.every(cell => cell.state === 0));

			// If all cell states are zero, execute createRandomGrid
			if (allCellsStateZero) {
				setGrid(createRandomGrid(numRows, numCols, densityValue, statesValue));
			}
			const interval = setInterval(updateGrid, intervalValue);
			return () => clearInterval(interval);
		}
	}, [isRunning, selectedBornNumbers, selectedSurviveNumbers, grid]);

	const handlePresetClick = (presetKey) => {
		const preset = presets[presetKey];
		setSelectedBornNumbers(preset.born);
		setSelectedSurviveNumbers(preset.survive);
		setStatesValue(preset.states);
		setGrid(createEmptyGrid(numRows, numCols));
	};

	return (
		<React.StrictMode>
			<AppContainer>
				<ControlContainer>
					<Button onClick={() => setIsRunning(!isRunning)}>
						{isRunning ? 'Pause' : 'Run'}
					</Button>
					<Button disabled={isRunning} onClick={() => setGrid(createRandomGrid(numRows, numCols, densityValue, statesValue))}>Reset</Button>
				</ControlContainer>
				<Grid grid={grid} toggleCellState={toggleCellState} stateMax={statesValue} color={color} />
				<RuleContainer>
					<Label>Rule: B{selectedBornNumbers.join('')}/S{selectedSurviveNumbers.join('')}/S{statesValue}</Label>
				</RuleContainer>
				<ConfigContainer>
					<BornContainer>
						<ConfigLabel>Born</ConfigLabel>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
							<Label key={num}>
								<Checkbox
									disabled={isRunning}
									type="checkbox"
									name={num.toString()}
									value={num}
									checked={selectedBornNumbers.includes(num)}
									onChange={handleCheckboxBornChange}
								/>
								{num}
							</Label>
						))}
					</BornContainer>
					<SurviveContainer>
						<ConfigLabel>Survive</ConfigLabel>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
							<Label key={num}>
								<Checkbox
									disabled={isRunning}
									type="checkbox"
									name={num.toString()}
									value={num}
									checked={selectedSurviveNumbers.includes(num)}
									onChange={handleCheckboxSurviveChange}
								/>
								{num}
							</Label>
						))}
					</SurviveContainer>
					<StatesContainer>
						<ConfigLabel>States</ConfigLabel>
						<Slider
							disabled={isRunning}
							type="range"
							min="1"
							max="25"
							value={statesValue}
							onChange={handleStatesChange}
						/>
						<div>{statesValue}</div>
					</StatesContainer>
					<DensityContainer>
						<ConfigLabel>Density [%]</ConfigLabel>
						<Slider
							disabled={isRunning}
							type="range"
							min="0"
							max="100"
							value={densityValue}
							onChange={handleDensityChange}
						/>
						<div>{densityValue}</div>
					</DensityContainer>
					<IntervalContainer>
						<ConfigLabel>Interval [ms]</ConfigLabel>
						<Slider
							disabled={isRunning}
							type="range"
							min="100"
							max="1000"
							step="10"
							value={intervalValue}
							onChange={handleIntervalChange}
						/>
						<div>{intervalValue}</div>
					</IntervalContainer>
				</ConfigContainer>
				<PresetContainer>
					<ConfigLabel>Preset</ConfigLabel>
					<PresetButtonContainer>
						{Object.keys(presets).map(presetKey => (
							<Button disabled={isRunning} key={presetKey} onClick={() => handlePresetClick(presetKey)}>
								{presetKey}
							</Button>
						))}
					</PresetButtonContainer>
				</PresetContainer>
			</AppContainer>
		</React.StrictMode>
	);
};

export function render(node: HTMLElement) {
	createRoot(node).render(<App />);
}

