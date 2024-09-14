//react context for keeping track of the current step and the amounts entered by the user in each step

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { FlowLabels, flowSteps, Steps } from "./steps";

type ContextType = {
	flow: FlowLabels;
	setFlow: (flow: FlowLabels) => void;
	step: Steps;
	nextStep: () => void;
	reset: () => void;
	setVar: (key: string, value: number) => void;
	vars: Record<string, number>;
};

const calculatorContext = createContext<ContextType>({} as ContextType);

const CalculatorContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [flow, setFlow] = useState(FlowLabels.School);
	const [vars, setVars] = useState<Record<string, number>>({});
	const value = useMemo(
		() => ({
			step: flowSteps[flow][currentStep],
			nextStep: () => setCurrentStep((prev) => prev + 1),
			flow,
			setFlow,
			reset: () => setCurrentStep(0),
			setVar: (key: string, value: number) => setVars((prev) => ({ ...prev, [key]: value })),
			vars
		}),
		[currentStep, setCurrentStep, flow, setFlow]
	);
	return <calculatorContext.Provider value={value}>{children}</calculatorContext.Provider>;
};

export const useCalculatorContext = () => useContext(calculatorContext);

export default CalculatorContextProvider;
