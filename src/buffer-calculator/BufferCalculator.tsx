import { FC } from "react";
import CalculatorContextProvider, { useCalculatorContext } from "./CalculatorContext";
import CalculatorSelection from "./CalculatorSelection";
import Step from "./Step";
import { Steps } from "./steps";

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
	[Steps.Result]: () => <div>Result</div>
};

const PageSelector = () => {
	const { flow, step, reset } = useCalculatorContext();

	const StepComponent = StepComponents[step];
	return (
		<div>
			<div>flow : {flow}</div>
			<StepComponent />
			<button type="button" onClick={reset}>
				Terug
			</button>
		</div>
	);
};

export default BufferCalculator;
