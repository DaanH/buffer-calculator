import { formatPercentage, summary } from './helpers';
import { FlowLabels } from './steps';
import { IConstants, IResults, IVariables } from './types';

const getNormativePartnership = (vars: IVariables, constants: IConstants) => {
	const { 'risk-buffer.total': riskBufferTotal } = vars;
	const minValue = constants.minimum;

	return Math.max(minValue, constants.factorSamenwerkingsverband * riskBufferTotal);
};

const getNormativeSingleSchool = (vars: IVariables, constants: IConstants) => {
	const {
		'buildings.total': buildingsTotal,
		'assets.total': assetsTotal,
		'assets.current-building-value': currentBuildingValue,
		'risk-buffer.total': riskBufferTotal
	} = vars;

	return (
		buildingsTotal * constants.factorShool + // 1.27 is the building cost index
		assetsTotal - // boekwaarde totale MVA
		currentBuildingValue + // - boekwaarde gebouwen
		calculateBuffer(riskBufferTotal, constants)
	); // bufferpersentage * totaal aan baten
};

const calculateBuffer = (riskBuffer: number, constants: IConstants) => {
	const userValue = riskBuffer;
	const baseBuffer = constants.basisbuffer;
	const minValue = constants.minwaarde;
	const maxValue = constants.maxwaarde;
	const minimumPct = constants.minpercentage;
	const maximumPct = constants.maxpercentage;

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

export const getResults = (vars: IVariables, flow: FlowLabels, constants: IConstants): IResults => {
	const { 'capital.total': capitalTotal, 'capital.private': capitalPrivate } = vars;
	const normative =
		flow === FlowLabels.School
			? getNormativeSingleSchool(vars, constants)
			: getNormativePartnership(vars, constants);
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
