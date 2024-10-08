import { ReactNode } from "react";
import { ReactComponent as AssetsIcon } from "../assets/icons/assets.svg";
import { ReactComponent as BuildingsIcon } from "../assets/icons/buildings.svg";
import { ReactComponent as PartnershipIcon } from "../assets/icons/partnership.svg";
import { ReactComponent as SchoolIcon } from "../assets/icons/school.svg";
import { ReactComponent as WalletIcon } from "../assets/icons/wallet.svg";
import { ReactComponent as WarningIcon } from "../assets/icons/warning.svg";
import { useTranslation } from "../i18n";
import { useCalculatorContext } from "./CalculatorContext";
import { FlowLabels, flowSteps, stepProps, Steps } from "./steps";

const iconsByStep: Record<Steps, ReactNode> = {
	[Steps.Organization]: <SchoolIcon />,
	[Steps.Capital]: <WalletIcon />,
	[Steps.Buildings]: <BuildingsIcon />,
	[Steps.Assets]: <AssetsIcon />,
	[Steps.Riskbuffer]: <WarningIcon />,
	[Steps.Result]: <WalletIcon />
};

const TabIcon = ({ step }: { step: Steps }) => {
	const { flow } = useCalculatorContext();
	if (step === Steps.Organization) return flow === FlowLabels.Partnership ? <PartnershipIcon /> : <SchoolIcon />;
	return iconsByStep[step];
};

const Progress = () => {
	const { t } = useTranslation();
	const { flow, vars, step, setStep, touchedSteps } = useCalculatorContext();
	const currentIndex = flowSteps[flow].indexOf(step);
	return (
		<div className="flex flex-row flex-nowrap items-stretch gap-1 h-36 w-full text-[0.75rem] leading-4">
			{flowSteps[flow].slice(0, -1).map((flowStep, index) => (
				<div
					key={flowStep}
					className={`w-1 flex transition-[margin,border] ease-in-out items-center justify-start flex-col flex-grow pt-2 
					${index < currentIndex ? "bg-[#f9f9f9]" : ""} 
					${index > currentIndex ? "bg-[#e6e6e6]" : ""}
					${currentIndex === index ? "bg-white border-t-8 mt-0 border-main" : "mt-4 border-transparent"}`}
				>
					<div className="flex text-3xl fill-main items-center justify-center w-12 h-12 ">
						<TabIcon step={flowStep} />
					</div>
					<div className="font-bold mb-2">{t(`steps.${flowStep}.name`)}</div>
					<div>{touchedSteps[flowStep] && stepProps[flowStep].summary(vars, flow, t)}</div>
					{touchedSteps[flowStep] && (
						<button className="underline text-skyBlue" type="button" onClick={() => setStep(index)}>
							{t("steps.all.change")}
						</button>
					)}
				</div>
			))}
		</div>
	);
};

export default Progress;
