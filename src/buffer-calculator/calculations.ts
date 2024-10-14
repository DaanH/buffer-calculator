import { formatPercentage, summary } from './helpers';
import { FlowLabels } from './steps';

const getNormativePartnership = (vars: Record<string, number>) => {
	const { 'risk-buffer.total': riskBufferTotal } = vars;
	const minValue = 250000;

	return Math.max(minValue, 0.035 * riskBufferTotal);
};

const getNormativeSingleSchool = (vars: Record<string, number>) => {
	const {
		'buildings.total': buildingsTotal,
		'assets.total': assetsTotal,
		'assets.current-building-value': currentBuildingValue,
		'risk-buffer.total': riskBufferTotal
	} = vars;

	return (
		buildingsTotal * 0.5 * 1.27 + // 1.27 is the building cost index
		assetsTotal - // boekwaarde totale MVA
		currentBuildingValue + // - boekwaarde gebouwen
		calculateBuffer(riskBufferTotal)
	); // bufferpersentage * totaal aan baten
};

const calculateBuffer = (riskBuffer: number) => {
	const userValue = riskBuffer;
	const baseBuffer = 300000; // you may always have this 300k buffer, even with 0 income.
	const minValue = 3000000;
	const maxValue = 12000000;
	const minimumPct = 5;
	const maximumPct = 10;

	if (userValue < minValue) {
		return baseBuffer;
	}

	if (userValue > maxValue) {
		return (minimumPct * userValue) / 100;
	}

	const log = Math.log10; // just to be clear: we use base 10.
	const diffPct = maximumPct - minimumPct;
	const diffLog = log(minValue) - log(maxValue);
	const realDiffLog = log(userValue) - log(maxValue);

	const bufferPct = minimumPct + (diffPct / diffLog) * realDiffLog;

	return (bufferPct * userValue) / 100;
};

export interface IResults {
	total: string;
	private: string;
	real: string;
	normative: string;
	ratio: string;
	excess: string;
	excessNumber: number;
}

export const getResults = (vars: Record<string, number>, flow: FlowLabels): IResults => {
	const { 'capital.total': capitalTotal, 'capital.private': capitalPrivate } = vars;
	const normative = flow === FlowLabels.School ? getNormativeSingleSchool(vars) : getNormativePartnership(vars);
	const excess = Math.max(0, capitalTotal - capitalPrivate - normative);
	return {
		total: summary(() => capitalTotal),
		private: summary(() => capitalPrivate),
		real: summary(() => capitalTotal - capitalPrivate),
		normative: summary(() => normative),
		ratio: formatPercentage((capitalTotal - capitalPrivate) / normative),
		excess: summary(() => excess),
		excessNumber: excess
	};
};
