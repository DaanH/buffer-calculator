import CalculatorContextProvider, { useCalculatorContext } from "./CalculatorContext";
import CalculatorSelection from "./CalculatorSelection";

const BufferCalculator = () => {
	return (
		<CalculatorContextProvider>
			<div className="bg-slate-500 ">
				<PageSelector />
			</div>
		</CalculatorContextProvider>
	);
};

const PageSelector = () => {
	const { flow, currentStep, setCurrentStep } = useCalculatorContext();
	if (currentStep === -1) {
		return <CalculatorSelection />;
	}
	return (
		<div className="bg-white ">
			<div>flow : {flow}</div>
			<button
				type="button"
				onClick={() => {
					setCurrentStep(-1);
				}}
			>
				Terug
			</button>
		</div>
	);
};

export default BufferCalculator;
