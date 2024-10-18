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
			<h3 className="mt-4 text-xl font-bold">{t('select-form.question')}</h3>
			<div className="my-8 flex w-full items-stretch justify-stretch gap-5">
				{Object.values(FlowLabels).map((flowLabel) => (
					<button
						key={flowLabel}
						className="flex w-1 flex-grow flex-col items-center gap-3 bg-white p-8"
						type="button"
						onClick={() => setLocalFlow(flowLabel)}
					>
						<div className="flex items-center justify-center fill-main text-7xl">
							<StepIcon step={Steps.Organization} flow={flowLabel} />
						</div>
						<span className="text-sm font-bold">{t(`select-form.${flowLabel}`)}</span>
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
	<div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-button">
		<div
			className={`h-3 w-3 rounded-full bg-button transition-transform duration-100 ${
				checked ? 'scale-100' : 'scale-0'
			}`}
		/>
	</div>
);
export default CalculatorSelection;
