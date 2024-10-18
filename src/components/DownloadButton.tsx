import { useCalculatorContext } from '../buffer-calculator/CalculatorContext';
import { generatePdf, splitResultHelpTexts } from '../buffer-calculator/pdf-export/pdfHelpers';
import { IResults } from '../buffer-calculator/types';
import { useTranslation } from '../i18n';
import { File } from '../icons';

interface Props {
	results: IResults;
	conclusion: string;
}

const DownloadButton = ({ results, conclusion }: Props) => {
	const { t } = useTranslation();
	const { flow } = useCalculatorContext();
	const help = t(`result.help.${flow}`);
	const helpTexts = splitResultHelpTexts(help);

	return (
		<button
			type="button"
			className="group relative bg-button py-5 pl-20 text-left text-white hover:bg-hover"
			onClick={() => generatePdf(t, { title: t('steps.result.title'), results, conclusion, helpTexts })}
		>
			<File className="absolute left-5 top-1/2 h-10 w-10 -translate-y-1/2 fill-white" />
			<div className="text-xl font-bold group-hover:underline">{t('result.download-title')}</div>
			<div className="text-sm">{t('result.download-text')}</div>
		</button>
	);
};

export default DownloadButton;
