//react context for keeping track of the current step and the amounts entered by the user in each step

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { FlowLabels, flowSteps, Steps } from './steps';

export type CalculatorContextType = {
	flow: FlowLabels;
	setFlow: (flow: FlowLabels) => void;
	step: Steps;
	touchedSteps: Partial<Record<Steps, boolean>>;
	nextStep: () => void;
	setStep: (index: number) => void;
	setVar: (key: string, value: number) => void;
	vars: Record<string, number>;
};

const calculatorContext = createContext<CalculatorContextType>({} as CalculatorContextType);

const CalculatorContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [flow, setFlow] = useState(FlowLabels.School);
	const [vars, setVars] = useState<CalculatorContextType['vars']>({});
	const [touchedSteps, setTouchedSteps] = useState<CalculatorContextType['touchedSteps']>({});
	const setStep = useCallback(
		(index: number) => {
			setTouchedSteps((old) => ({
				...old,
				[flowSteps[flow][currentStep]]: true
			}));
			setCurrentStep(index);
		},
		[currentStep, flow]
	);

	const value = useMemo<CalculatorContextType>(
		() => ({
			step: flowSteps[flow][currentStep],
			touchedSteps,
			nextStep: () => setStep(currentStep + 1),
			flow,
			setFlow: (flow: FlowLabels) => {
				setFlow(flow);
				setVars({});
				setTouchedSteps({});
			},
			setStep,
			setVar: (key: string, value: number) => setVars((prev) => ({ ...prev, [key]: value })),
			vars
		}),
		[currentStep, flow, setFlow, vars, touchedSteps]
	);
	return <calculatorContext.Provider value={value}>{children}</calculatorContext.Provider>;
};

export const useCalculatorContext = () => useContext(calculatorContext);

export default CalculatorContextProvider;
