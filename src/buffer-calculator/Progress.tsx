import { StepIcon } from '../components/StepIcon';
import { useTranslation } from '../i18n';
import { useCalculatorContext } from './CalculatorContext';
import { flowSteps, stepProps } from './steps';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const usedBgColors = 'bg-[#f9f9f9] bg-[#ddd] bg-white border-t-[#f9f9f9] border-t-[#ddd] border-t-white';

const Progress = () => {
	const { t } = useTranslation();
	const { flow, vars, step, setStep, touchedSteps } = useCalculatorContext();
	const currentIndex = flowSteps[flow].indexOf(step);
	return (
		<div className="flex h-36 w-full flex-row flex-nowrap items-stretch gap-1 text-[0.75rem] leading-4">
			{flowSteps[flow].slice(0, -1).map((flowStep, index) => {
				const bgColor = index < currentIndex ? '[#f9f9f9]' : index > currentIndex ? '[#ddd]' : 'white';
				const isActive = index === currentIndex;
				const isTouched = touchedSteps[flowStep];
				return (
					<div
						key={flowStep}
						className={`relative flex w-1 flex-grow flex-col items-center justify-start pt-2 transition-[margin,border] ease-in-out bg-${bgColor} ${
							isActive ? 'mt-0 border-t-8 border-main' : 'mt-4 border-transparent'
						} ${isTouched || isActive ? '' : 'opacity-50'}`}
					>
						<div
							className={`absolute top-full h-[48px] w-[48px] border-[24px] border-transparent border-t-${bgColor} transition-transform ease-in-out ${
								isActive ? '-translate-y-0' : '-translate-y-1/2'
							}`}
						/>
						<div
							className={`flex h-12 w-12 items-center justify-center fill-main text-3xl ${
								isTouched || isActive ? 'fill-main' : 'fill-neutral-600'
							}`}
						>
							<StepIcon step={flowStep} flow={flow} />
						</div>
						<div className={`mb-2 font-bold ${isActive ? 'text-main' : 'text-[#696969]'}`}>
							{t(`steps.${flowStep}.name`)}
						</div>
						<div>{isTouched && stepProps[flowStep].summary(vars, flow, t)}</div>
						{isTouched && (
							<button className="text-skyBlue underline" type="button" onClick={() => setStep(index)}>
								{t('steps.all.change')}
							</button>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Progress;
