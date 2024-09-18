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

type StepProps = {
	fields: string[];
	summary: (vars: Record<string, number>, flow: FlowLabels) => string;
};
export const stepProps: Record<Steps, StepProps> = {
	[Steps.Organization]: { fields: [], summary: (vars, flow) => flow },
	[Steps.Capital]: { fields: ["total", "private"], summary: (vars) => "c" },
	[Steps.Buildings]: { fields: ["total"], summary: (vars) => "b" },
	[Steps.Assets]: { fields: ["total", "current-building-value"], summary: (vars) => "a" },
	[Steps.Riskbuffer]: { fields: ["total"], summary: (vars) => "r" },
	[Steps.Result]: { fields: [], summary: (vars) => "res" }
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
