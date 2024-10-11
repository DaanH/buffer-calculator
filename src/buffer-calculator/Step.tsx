import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from '../i18n';
import Button from '../components/Button';
import { useCalculatorContext } from './CalculatorContext';
import DebugPanel from './DebugPanel';
import Explanation from './Explanation';
import { formatThousands, toNumber } from './helpers';
import Progress from './Progress';
import { flowSteps, stepProps } from './steps';

const Step = () => {
	const { t } = useTranslation();
	const { step, nextStep, setVar, vars, flow, touchedSteps, setStep } = useCalculatorContext();

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
		<div ref={ref} className="flex flex-col items-start gap-2">
			<Progress />

			<h3 className="mt-4 text-xl font-bold">{t(`steps.${step}.title`)}</h3>
			<Explanation text={t(`steps.${step}.help`)} />
			<fieldset className="mb-10 mt-8 w-full border-t border-t-gray-600">
				{stepProps[step].fields.map((field) => (
					<label key={field} htmlFor={field} className="mt-6 flex flex-col items-start gap-2">
						<span>{t(`steps.${step}.labels.${field}`)}</span>
						<input
							type="text"
							id={field}
							onChange={onChange}
							value={formatThousands(vars[`${step}.${field}`]) || '€ '}
							className="flex gap-2 border border-gray-500 bg-white px-2 py-2"
						/>
					</label>
				))}
			</fieldset>
			<Button onClick={proceedToResult ? () => setStep(flowSteps[flow].length - 1) : nextStep}>
				{proceedToResult ? t('steps.buttons.to-result') : t('steps.buttons.next-step')}
			</Button>
			<DebugPanel />
		</div>
	);
};
export default Step;
