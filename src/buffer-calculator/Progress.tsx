import { useCalculatorContext } from "./CalculatorContext";
import { flowSteps } from "./steps";

const Progress = () => {
	const { flow, step } = useCalculatorContext();
	const currentIndex = flowSteps[flow].indexOf(step);
	return (
		<div className="flex flex-row flex-nowrap items-stretch gap-1 h-32 w-full text-[15px]">
			{flowSteps[flow].map((flowStep, index) => (
				<div
					key={flowStep}
					className={`w-1 flex items-center justify-center  flex-grow border-mossGreen ${
						index < currentIndex ? "bg-[#f9f9f9]" : ""
					} 
					${index > currentIndex ? "bg-[#e6e6e6]" : ""}
					${currentIndex === index ? "bg-white border-t-8 mt-0" : "mt-4"}
					`}
				>
					{flowStep}
				</div>
			))}
		</div>
	);
};

export default Progress;
