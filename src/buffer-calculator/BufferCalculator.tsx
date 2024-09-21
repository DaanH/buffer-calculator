import { FC } from "react";
import CalculatorContextProvider, { useCalculatorContext } from "./CalculatorContext";
import CalculatorSelection from "./CalculatorSelection";
import Step from "./Step";
import { Steps } from "./steps";
import ResultStep from "./ResultStep";

const BufferCalculator = () => {
	return (
		<CalculatorContextProvider>
			<div className="bg-background p-8">
				<PageSelector />
			</div>
		</CalculatorContextProvider>
	);
};

const StepComponents: Record<Steps, FC> = {
	[Steps.Organization]: CalculatorSelection,
	[Steps.Capital]: Step,
	[Steps.Buildings]: Step,
	[Steps.Assets]: Step,
	[Steps.Riskbuffer]: Step,
	[Steps.Result]: ResultStep
};

const PageSelector = () => {
	const { step } = useCalculatorContext();

	const StepComponent = StepComponents[step];
	return <StepComponent />;
};

export default BufferCalculator;
