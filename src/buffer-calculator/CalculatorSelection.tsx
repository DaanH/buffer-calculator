import { useState } from 'react';
import { useTranslation } from '../i18n';
import { StepIcon } from '../components/StepIcon';
import Button from '../components/Button';
import { useCalculatorContext } from './CalculatorContext';
import DebugPanel from './DebugPanel';
import { FlowLabels, Steps } from './steps';

const CalculatorSelection = () => {
	const { t } = useTranslation();
	const { setFlow, nextStep } = useCalculatorContext();
	const [localFlow, setLocalFlow] = useState<FlowLabels | null>(null);
	return (
		<div>
			<h3 className="text-xl font-bold mt-4">{t('select-form.question')}</h3>
			<div className="flex gap-5 my-8 w-full items-stretch justify-stretch">
				{Object.values(FlowLabels).map((flowLabel) => (
					<button
						key={flowLabel}
						className="bg-white p-8 w-1 flex-grow flex flex-col items-center gap-3"
						type="button"
						onClick={() => setLocalFlow(flowLabel)}
					>
						<div className="flex text-7xl fill-main items-center justify-center  ">
							<StepIcon step={Steps.Organization} flow={flowLabel} />
						</div>
						<span className="font-bold text-sm">{t(`select-form.${flowLabel}`)}</span>
						<Radio checked={localFlow === flowLabel} />
					</button>
				))}
			</div>
			<Button
				onClick={() => {
					if (localFlow) {
						setFlow(localFlow);
						nextStep();
					}
				}}
				disabled={!localFlow}
				disabledHint={t('select-form.submit-hint')}
			>
				{t('steps.buttons.next-step')}
			</Button>
			<DebugPanel />
		</div>
	);
};

const Radio = ({ checked }: { checked: boolean }) => (
	<div className="rounded-full border-2 border-button w-5 h-5 flex items-center justify-center ">
		<div className={`rounded-full bg-button w-3 h-3 transition-transform ${checked ? 'scale-100' : 'scale-0'}`} />
	</div>
);
export default CalculatorSelection;
