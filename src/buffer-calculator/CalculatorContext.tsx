//react context for keeping track of the current step and the amounts entered by the user in each step

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export enum FlowLabels {
	School = "School",
	Partnership = "Samenwerkingsverband"
}

type ContextType = {
	flow: FlowLabels;
	setFlow: (flow: FlowLabels) => void;
	currentStep: number;
	setCurrentStep: (step: number) => void;
};

const calculatorContext = createContext<ContextType>({} as ContextType);

const CalculatorContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentStep, setCurrentStep] = useState(-1);
	const [flow, setFlow] = useState(FlowLabels.School);
	const value = useMemo(
		() => ({
			currentStep,
			setCurrentStep,
			flow,
			setFlow
		}),
		[currentStep, setCurrentStep, flow, setFlow]
	);
	return <calculatorContext.Provider value={value}>{children}</calculatorContext.Provider>;
};

export const useCalculatorContext = () => useContext(calculatorContext);

export default CalculatorContextProvider;
