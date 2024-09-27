//react context for keeping track of the current step and the amounts entered by the user in each step

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { FlowLabels, flowSteps, Steps } from "./steps";

export type CalculatorContextType = {
	flow: FlowLabels;
	setFlow: (flow: FlowLabels) => void;
	step: Steps;
	nextStep: () => void;
	setStep: (index: number) => void;
	setVar: (key: string, value: number) => void;
	vars: Record<string, number>;
};

const calculatorContext = createContext<CalculatorContextType>({} as CalculatorContextType);

const CalculatorContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [flow, setFlow] = useState(FlowLabels.School);
	const [vars, setVars] = useState<CalculatorContextType["vars"]>({});
	const value = useMemo<CalculatorContextType>(
		() => ({
			step: flowSteps[flow][currentStep],
			nextStep: () => setCurrentStep((prev) => prev + 1),
			flow,
			setFlow: (flow: FlowLabels) => {
				setFlow(flow);
				setVars({});
			},
			setStep: (index: number) => setCurrentStep(index),
			setVar: (key: string, value: number) => setVars((prev) => ({ ...prev, [key]: value })),
			vars
		}),
		[currentStep, setCurrentStep, flow, setFlow, vars]
	);
	return <calculatorContext.Provider value={value}>{children}</calculatorContext.Provider>;
};

export const useCalculatorContext = () => useContext(calculatorContext);

export default CalculatorContextProvider;
