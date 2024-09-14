import { useState } from "react";
import { useTranslation } from "../i18n";
import { useCalculatorContext } from "./CalculatorContext";
import { FlowLabels } from "./steps";

const CalculatorSelection = () => {
	const { t } = useTranslation();
	const { setFlow, flow, nextStep } = useCalculatorContext();
	const [localFlow, setLocalFlow] = useState(flow);
	return (
		<div>
			<h2>
				{t("select-form.question")} - {flow}
			</h2>
			<div className="flex gap-5 w-full items-stretch justify-stretch">
				<button
					className="bg-white p-8 w-1 flex-grow"
					type="button"
					onClick={() => setLocalFlow(FlowLabels.School)}
				>
					{FlowLabels.School}
					{localFlow === FlowLabels.School && <span>✔</span>}
				</button>
				<button
					className="bg-white p-8 w-1 flex-grow"
					type="button"
					onClick={() => setLocalFlow(FlowLabels.Partnership)}
				>
					{FlowLabels.Partnership}
					{localFlow === FlowLabels.Partnership && <span>✔</span>}
				</button>
			</div>
			<div>
				<button
					type="button"
					className="bg-darkBlue py-2 px-3 text-white"
					onClick={() => {
						setFlow(localFlow);
						nextStep();
					}}
				>
					{t("steps.buttons.next-step")}
				</button>
			</div>
		</div>
	);
};
export default CalculatorSelection;
