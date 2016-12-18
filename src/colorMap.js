const percentColors = [
	{ pct: 0, color: { r: 0x33, g: 0x00, b: 0x1A } },
	{ pct: 0.33, color: { r: 0xB3, g: 0x00, b: 0x00 } },
	{ pct: 0.66, color: { r: 0xff, g: 0x47, b: 0x1A } },
	{ pct: 1.0, color: { r: 0xff, g: 0xff, b: 0x00 } }
];

export default function getColorForPercentage(pct) {
	let i = 1;
	for (; i < percentColors.length - 1; i++) {
		if (pct < percentColors[i].pct) {
			break;
		}
	}
	const lower = percentColors[i - 1];
	const upper = percentColors[i];
	const range = upper.pct - lower.pct;
	const rangePct = (pct - lower.pct) / range;
	const pctLower = 1 - rangePct;
	const pctUpper = rangePct;
	const color = {
		r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
		g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
		b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
	};
	return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
	// or output as hex if preferred
}
