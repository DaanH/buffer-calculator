import { CalculatorContextType } from "./CalculatorContext";
import { summary } from "./helpers";

export enum FlowLabels {
	School = "school",
	Partnership = "partnership"
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
	summary: (vars: CalculatorContextType["vars"], flow: FlowLabels, t: (key: string) => string) => string;
};

export const stepProps: Record<Steps, StepProps> = {
	[Steps.Organization]: {
		fields: [],
		summary: (_vars, flow, t) => t(`select-form.${flow}`)
	},
	[Steps.Capital]: {
		fields: ["total", "private"],
		summary: (vars) => summary(() => vars["capital.total"] - vars["capital.private"])
	},
	[Steps.Buildings]: {
		fields: ["total"],
		summary: (vars) => summary(() => vars["buildings.total"])
	},
	[Steps.Assets]: {
		fields: ["total", "current-building-value"],
		summary: (vars) => summary(() => vars["assets.total"] - vars["assets.current-building-value"])
	},
	[Steps.Riskbuffer]: {
		fields: ["total"],
		summary: (vars) => summary(() => vars["risk-buffer.total"])
	},
	[Steps.Result]: {
		fields: [],
		summary: () => ""
	}
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
