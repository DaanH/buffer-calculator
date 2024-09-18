import { ChangeEventHandler, useCallback } from "react";
import { useTranslation } from "../i18n";
import { useCalculatorContext } from "./CalculatorContext";
import { stepProps } from "./steps";
import Progress from "./Progress";

const Step = () => {
	const { t } = useTranslation();
	const { step, nextStep, setVar, vars } = useCalculatorContext();

	const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(e) => {
			setVar(`${step}.${e.target.id}`, parseInt(e.target.value, 10));
		},
		[step]
	);

	return (
		<div className=" ">
			<Progress />
			<div className="font-mono text-xs p-2 my-2 border-2 rounded border-amber-300">
				{Object.entries(vars).map(([key, value]) => (
					<div>
						<span className="inline-block  w-40">{key}</span>
						{value}
					</div>
				))}
			</div>
			<h2>{t(`steps.${step}.title`)}</h2>
			<hr />
			<div>
				{stepProps[step].fields.map((field) => (
					<label key={field} className="flex flex-col gap-4 items-start">
						<span>{t(`steps.${step}.labels.${field}`)}</span>
						<input type="number" id={field} onChange={onChange} />
					</label>
				))}
			</div>
			<button type="button" className="bg-darkBlue p-8" onClick={nextStep}>
				{t("steps.buttons.next-step")}
			</button>
		</div>
	);
};
export default Step;
