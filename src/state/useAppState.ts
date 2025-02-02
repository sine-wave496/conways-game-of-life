import { useState, useEffect } from 'react';

export const useAppState = () => {
	const [selectedBornNumbers, setSelectedBornNumbers] = useState<number[]>([]);
	const [selectedSurviveNumbers, setSelectedSurviveNumbers] = useState<number[]>([]);
	const [statesValue, setStatesValue] = useState(1);
	const [densityValue, setDensityValue] = useState(20);
	const [intervalValue, setIntervalValue] = useState(100);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		const defaultBornNumbers = [3];
		setSelectedBornNumbers(defaultBornNumbers);
	}, []);

	useEffect(() => {
		const defaultSurviveNumbers = [2, 3];
		setSelectedSurviveNumbers(defaultSurviveNumbers);
	}, []);

	return {
		selectedBornNumbers,
		setSelectedBornNumbers,
		selectedSurviveNumbers,
		setSelectedSurviveNumbers,
		statesValue,
		setStatesValue,
		densityValue,
		setDensityValue,
		intervalValue,
		setIntervalValue,
		isRunning,
		setIsRunning
	};
};
