import { ReactNode } from 'react';
import { ReactComponent as AssetsIcon } from '../assets/icons/assets.svg';
import { ReactComponent as BuildingsIcon } from '../assets/icons/buildings.svg';
import { ReactComponent as PartnershipIcon } from '../assets/icons/partnership.svg';
import { ReactComponent as SchoolIcon } from '../assets/icons/school.svg';
import { ReactComponent as WalletIcon } from '../assets/icons/wallet.svg';
import { ReactComponent as WarningIcon } from '../assets/icons/warning.svg';
import { FlowLabels, Steps } from '../buffer-calculator/steps';

const iconsByStep: Record<Steps, ReactNode> = {
	[Steps.Organization]: <SchoolIcon />,
	[Steps.Capital]: <WalletIcon />,
	[Steps.Buildings]: <BuildingsIcon />,
	[Steps.Assets]: <AssetsIcon />,
	[Steps.Riskbuffer]: <WarningIcon />,
	[Steps.Result]: <WalletIcon />
};

interface Props {
	step: Steps;
	flow: FlowLabels;
}

export const StepIcon = ({ step, flow }: Props) => {
	if (step === Steps.Organization) return flow === FlowLabels.Partnership ? <PartnershipIcon /> : <SchoolIcon />;
	return iconsByStep[step];
};
