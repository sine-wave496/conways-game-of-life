export const mixColors = (color1: string, color2: string, ratio: number) => {
	const hexToRgb = (hex: string) => {
		let bigint = parseInt(hex.slice(1), 16);
		return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
	};

	const rgbToHex = (r: number, g: number, b: number) => {
		return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
	};

	const [r1, g1, b1] = hexToRgb(color1);
	const [r2, g2, b2] = hexToRgb(color2);

	const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
	const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
	const b = Math.round(b1 * (1 - ratio) + b2 * ratio);

	return rgbToHex(r, g, b);
};
