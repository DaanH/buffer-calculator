import { describe, expect, it } from 'vitest';
import { getResults } from './calculations';
import { FlowLabels } from './steps';
import { IConstants, IVariables } from './types';

describe('getResults', () => {
	it('should return the correct results for a school', () => {
		const vars: IVariables = {
			'buildings.total': 500000,
			'assets.total': 500000,
			'assets.current-building-value': 500000,
			'risk-buffer.total': 500000,
			'capital.total': 500000,
			'capital.private': 50000
		};
		const constants = {
			factorShool: 0.5 * 1.27,
			basisbuffer: 300000,
			minwaarde: 3000000,
			maxwaarde: 12000000,
			minpercentage: 5,
			maxpercentage: 10
		} as IConstants;

		expect(getResults(vars, FlowLabels.School, constants)).toEqual({
			excess: '€ 0',
			excessNumber: 0,
			normative: '€ 617.500',
			private: '€ 50.000',
			ratio: '0,73',
			real: '€ 450.000',
			total: '€ 500.000'
		});
	});
	it('should return the correct results for a partnership', () => {
		const vars: IVariables = {
			'buildings.total': 500000,
			'assets.total': 500000,
			'assets.current-building-value': 500000,
			'risk-buffer.total': 500000,
			'capital.total': 500000,
			'capital.private': 50000
		};
		const constants = {
			minimum: 250000,
			factorSamenwerkingsverband: 0.035
		} as IConstants;

		expect(getResults(vars, FlowLabels.Partnership, constants)).toEqual({
			excess: '€ 200.000',
			excessNumber: 200000,
			normative: '€ 250.000',
			private: '€ 50.000',
			ratio: '1,8',
			real: '€ 450.000',
			total: '€ 500.000'
		});
	});
});
