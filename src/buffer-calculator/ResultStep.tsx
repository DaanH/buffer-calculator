import { useTranslation } from "../i18n";
import { useCalculatorContext } from "./CalculatorContext";

const ResultStep = () => {
	const { vars, setStep } = useCalculatorContext();
	const { t } = useTranslation();
	return (
		<div>
			<div className="font-mono text-xs p-2 my-2 border-2 rounded border-amber-300">
				{Object.entries(vars).map(([key, value]) => (
					<div key={key}>
						<span className="inline-block  w-60">{key}</span>
						{value}
					</div>
				))}
			</div>
			<button className="bg-darkBlue py-2 px-3 text-white" type="button" onClick={() => setStep(0)}>
				{t("result.restart")}
			</button>
		</div>
	);
};

export default ResultStep;
