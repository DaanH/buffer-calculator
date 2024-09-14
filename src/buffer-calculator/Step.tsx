import { ChangeEventHandler, useCallback } from "react";
import { useTranslation } from "../i18n";
import { useCalculatorContext } from "./CalculatorContext";
import { stepFields } from "./steps";
import Progress from "./Progress";

const Step = () => {
	const { t } = useTranslation();
	const { step, nextStep, setVar } = useCalculatorContext();

	const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(e) => {
			setVar(`${step}.${e.target.id}`, parseInt(e.target.value, 10));
		},
		[step]
	);

	return (
		<div className=" ">
			<Progress />
			<h2>{t(`steps.${step}.title`)}</h2>
			<hr />
			<div>
				{stepFields[step].map((field) => (
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
