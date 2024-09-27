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
			<h2>{t("select-form.question")}</h2>
			<div className="flex gap-5 my-4 w-full items-stretch justify-stretch">
				{Object.values(FlowLabels).map((flowLabel) => (
					<button
						key={flowLabel}
						className="bg-white p-8 w-1 flex-grow flex flex-col items-center gap-3"
						type="button"
						onClick={() => setLocalFlow(flowLabel)}
					>
						{flowLabel}
						<Radio checked={localFlow === flowLabel} />
					</button>
				))}
			</div>
			<div>
				<button
					type="button"
					className="bg-button py-2 px-3 text-white"
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

const Radio = ({ checked }: { checked: boolean }) => (
	<div className="rounded-full border-2 border-button w-5 h-5 flex items-center justify-center ">
		<div className={`rounded-full bg-button w-3 h-3 transition-transform ${checked ? "scale-100" : "scale-0"}`} />
	</div>
);
export default CalculatorSelection;
