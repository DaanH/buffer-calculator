import { ChangeEventHandler, useCallback } from "react";
import { useTranslation } from "../i18n";
import { useCalculatorContext } from "./CalculatorContext";
import Progress from "./Progress";
import { stepProps } from "./steps";
import { formatThousands } from "./helpers";

const Step = () => {
	const { t } = useTranslation();
	const { step, nextStep, setVar, vars } = useCalculatorContext();

	const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(e) => {
			const v = e.target.value;
			const newValue = formatThousands(v);
			setVar(`${step}.${e.target.id}`, newValue);
		},
		[step]
	);

	return (
		<div className="flex flex-col gap-2 items-start ">
			<Progress />

			<h2>{t(`steps.${step}.title`)}</h2>
			<hr />
			{stepProps[step].fields.map((field) => (
				<>
					<span>{t(`steps.${step}.labels.${field}`)}</span>
					<input
						type="text"
						id={field}
						onChange={onChange}
						value={vars[`${step}.${field}`] || "€ "}
						className="px-2 flex gap-2 bg-white"
					/>
				</>
			))}
			<button type="button" className="bg-darkBlue py-2 px-3 text-white" onClick={nextStep}>
				{t("steps.buttons.next-step")}
			</button>
			<div className="font-mono text-xs p-2 my-2 border-2 rounded border-amber-300">
				{Object.entries(vars).map(([key, value]) => (
					<div key={key}>
						<span className="inline-block  w-40">{key}</span>
						{value}
					</div>
				))}
			</div>
		</div>
	);
};
export default Step;
