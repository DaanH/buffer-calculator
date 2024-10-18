export type IVariables = {
	'buildings.total': number;
	'assets.total': number;
	'assets.current-building-value': number;
	'risk-buffer.total': number;
	'capital.total': number;
	'capital.private': number;
};

export type IResults = {
	total: string;
	private: string;
	real: string;
	normative: string;
	ratio: string;
	excess: string;
	excessNumber: number;
};

export type IConstants = {
	minimum: number; // = 250000
	factorSamenwerkingsverband: number; // = 0.035
	factorShool: number; // = 0.5 * 1.27  (1.27 is the building cost index)
	basisbuffer: number; // = 300000
	minwaarde: number; // = 3000000
	maxwaarde: number; // = 12000000
	minpercentage: number; // = 5
	maxpercentage: number; // = 10;
};
