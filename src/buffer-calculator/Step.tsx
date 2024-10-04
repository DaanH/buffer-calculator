import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from '../i18n';
import { useCalculatorContext } from './CalculatorContext';
import DebugPanel from './DebugPanel';
import Explanation from './Explanation';
import { formatThousands, toNumber } from './helpers';
import Progress from './Progress';
import { flowSteps, stepProps } from './steps';

const Step = () => {
	const { t } = useTranslation();
	const { step, nextStep, setVar, vars, flow, touchedSteps } = useCalculatorContext();

	const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(e) => {
			const v = e.target.value;
			setVar(`${step}.${e.target.id}`, toNumber(v));
		},
		[setVar, step]
	);

	const ref = useRef<HTMLInputElement>(null);
	useEffect(() => {
		//focus first input in this component
		ref.current?.querySelector('input')?.focus();
	}, [step]);

	const proceedToResult = useMemo(() => {
		const steps = flowSteps[flow];
		const isLastStep = steps.indexOf(step) === steps.length - 2;
		const lastStep = steps[steps.length - 2];
		const hasTouchedLastStep = touchedSteps[lastStep];
		return isLastStep || hasTouchedLastStep;
	}, [flow, step, touchedSteps]);

	return (
		<div ref={ref} className="flex flex-col gap-2 items-start ">
			<Progress />

			<h3 className="text-xl font-bold mt-4">{t(`steps.${step}.title`)}</h3>
			<Explanation text={t(`steps.${step}.help`)} />
			<fieldset className="w-full mt-8 border-t border-t-gray-600 mb-10">
				{stepProps[step].fields.map((field) => (
					<label key={field} htmlFor={field} className="flex flex-col items-start gap-2 mt-6">
						<span>{t(`steps.${step}.labels.${field}`)}</span>
						<input
							type="text"
							id={field}
							onChange={onChange}
							value={formatThousands(vars[`${step}.${field}`]) || '€ '}
							className="px-2 py-2 flex gap-2 bg-white border border-gray-500"
						/>
					</label>
				))}
			</fieldset>
			<button type="button" className="bg-button py-2 px-3 text-white" onClick={nextStep}>
				{proceedToResult ? t('steps.buttons.to-result') : t('steps.buttons.next-step')}
			</button>
			<DebugPanel />
		</div>
	);
};
export default Step;
