import { ChangeEventHandler, Fragment, useCallback } from "react";
import { useTranslation } from "../i18n";
import { useCalculatorContext } from "./CalculatorContext";
import Progress from "./Progress";
import { stepProps, Steps } from "./steps";
import { formatThousands, toNumber } from "./helpers";
import Explanation from "./Explanation";
import DebugPanel from "./DebugPanel";

const Step = () => {
	const { t } = useTranslation();
	const { step, nextStep, setVar, vars } = useCalculatorContext();

	const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(e) => {
			const v = e.target.value;
			setVar(`${step}.${e.target.id}`, toNumber(v));
		},
		[step]
	);

	//is last step in flow?
	const isLastStep = step === Steps.Riskbuffer;

	return (
		<div className="flex flex-col gap-2 items-start ">
			<Progress />

			<h3 className="text-xl font-bold mt-4">{t(`steps.${step}.title`)}</h3>
			<Explanation text={t(`steps.${step}.help`)} />
			<hr />
			{stepProps[step].fields.map((field) => (
				<Fragment key={field}>
					<span>{t(`steps.${step}.labels.${field}`)}</span>
					<input
						type="text"
						id={field}
						onChange={onChange}
						value={formatThousands(vars[`${step}.${field}`]) || "€ "}
						className="px-2 flex gap-2 bg-white"
					/>
				</Fragment>
			))}
			<button type="button" className="bg-button py-2 px-3 text-white" onClick={nextStep}>
				{isLastStep ? t("steps.buttons.to-result") : t("steps.buttons.next-step")}
			</button>
			<DebugPanel />
		</div>
	);
};
export default Step;
