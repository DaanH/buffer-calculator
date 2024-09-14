export enum FlowLabels {
	School = "School",
	Partnership = "Samenwerkingsverband"
}

export enum Steps {
	Organization = "organization",
	Capital = "capital",
	Buildings = "buildings",
	Assets = "assets",
	Riskbuffer = "risk-buffer",
	Result = "result"
}

export const stepFields: Record<Steps, string[]> = {
	[Steps.Organization]: [],
	[Steps.Capital]: ["total", "private"],
	[Steps.Buildings]: ["total"],
	[Steps.Assets]: ["total", "current-building-value"],
	[Steps.Riskbuffer]: ["total"],
	[Steps.Result]: []
};

export const flowSteps: Record<FlowLabels, Steps[]> = {
	[FlowLabels.School]: [
		Steps.Organization,
		Steps.Capital,
		Steps.Buildings,
		Steps.Assets,
		Steps.Riskbuffer,
		Steps.Result
	],
	[FlowLabels.Partnership]: [Steps.Organization, Steps.Capital, Steps.Riskbuffer, Steps.Result]
};
