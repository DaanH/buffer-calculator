import { useTranslation } from "../i18n";
import { useCalculatorContext } from "./CalculatorContext";
import Explanation from "./Explanation";
import Progress from "./Progress";

const ResultStep = () => {
	const { step, vars, setStep, flow } = useCalculatorContext();
	const { t } = useTranslation();
	return (
		<div>
			<Progress />

			<h3 className="text-xl font-bold mt-4">{t(`steps.${step}.title`)}</h3>
			<Explanation text={t(`result.help.${flow}`)} buttonFirst minimizedSize={0} />

			<div className="font-mono text-xs p-2 my-2 border-2 rounded border-amber-300">
				{Object.entries(vars).map(([key, value]) => (
					<div key={key}>
						<span className="inline-block  w-60">{key}</span>
						{value}
					</div>
				))}
			</div>
			<button className="bg-button py-2 px-3 text-white" type="button" onClick={() => setStep(0)}>
				{t("result.restart")}
			</button>
		</div>
	);
};

export default ResultStep;
