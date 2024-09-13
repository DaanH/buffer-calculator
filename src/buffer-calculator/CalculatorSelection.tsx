import { useState } from "react";
import { useTranslation } from "../i18n";
import { FlowLabels, useCalculatorContext } from "./CalculatorContext";

const CalculatorSelection = () => {
	const { t } = useTranslation();
	const { setFlow, flow, setCurrentStep } = useCalculatorContext();
	const [localFlow, setLocalFlow] = useState(flow);
	return (
		<div className="bg-slate-500 ">
			<h2>
				{t("select-form.question")} - {flow}
			</h2>
			<div>
				<button className="bg-white p-8" type="button" onClick={() => setLocalFlow(FlowLabels.School)}>
					{FlowLabels.School}
					{localFlow === FlowLabels.School && <span>✔</span>}
				</button>
				<button className="bg-white p-8" type="button" onClick={() => setLocalFlow(FlowLabels.Partnership)}>
					{FlowLabels.Partnership}
					{localFlow === FlowLabels.Partnership && <span>✔</span>}
				</button>
			</div>
			<div>
				<button
					type="button"
					className="bg-darkBlue p-8"
					onClick={() => {
						setFlow(localFlow);
						setCurrentStep(0);
					}}
				>
					ga verder knop
				</button>
			</div>
		</div>
	);
};
export default CalculatorSelection;
