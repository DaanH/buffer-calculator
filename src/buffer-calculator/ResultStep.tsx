import { useMemo } from 'react';
import DownloadButton from '../components/DownloadButton';
import { useTranslation } from '../i18n';
import { Play } from '../icons';
import useAsset from '../hooks/useAsset';
import { getResults } from './calculations';
import { useCalculatorContext } from './CalculatorContext';
import DebugPanel from './DebugPanel';
import Explanation from './Explanation';
import Progress from './Progress';
import { IConstants, IResults } from './types';

const parseConstants = (source: string) => JSON.parse(source) as IConstants;

const ResultStep = () => {
	const { step, vars, setStep, flow } = useCalculatorContext();
	const { t } = useTranslation();
	const constants = useAsset<IConstants>('constants.json', parseConstants);
	const results = useMemo<IResults>(
		() => (constants ? getResults(vars, flow, constants) : ({} as IResults)),
		[constants, flow, vars]
	);
	const conclusion = results.excessNumber > 0 ? t('result.note.excess') : t('result.note.no-excess');

	return (
		<div className="flex flex-col gap-2">
			<Progress />

			<h3 className="my-4 text-xl font-bold">{t(`steps.${step}.title`)}</h3>

			<div className="bg-white p-4 leading-normal">
				<table className="mx-auto">
					<tbody>
						<ResultLine label={t('result.total')} value={results.total} />
						<ResultLine label={t('result.private')} value={results.private} />
						<SumLine />

						<ResultLine label={t('result.real')} value={results.real} />
						<ResultLine label={t('result.normative')} value={results.normative} />
						<SumLine />

						<ResultLine label={t('result.excess')} value={results.excess} className="font-bold" />
						<tr className="h-20 text-left italic">
							<td colSpan={2}>
								{t('result.ratio')}: {results.ratio}
							</td>
						</tr>
					</tbody>
				</table>
				<div className="text-left text-xs">{t('result.disclaimer')}</div>
			</div>
			<div className="-mt-2 mb-8 bg-[#e6e6e6] px-4 pb-2">
				<Explanation text={t(`result.help.${flow}`)} buttonFirst minimizedSize={0} />
			</div>
			<p>{conclusion}</p>
			<DownloadButton results={results} conclusion={conclusion} />

			<div className="flex items-center gap-2 text-sm text-button">
				<div className="rotate-180">
					<Play />
				</div>
				<button className="underline" type="button" onClick={() => setStep(0)}>
					{t('result.restart')}
				</button>
			</div>
			<DebugPanel />
		</div>
	);
};

const ResultLine = ({ label, value, className = '' }: { label: string; value: string; className?: string }) => (
	<tr className={`text-right ${className}`}>
		<td className="pr-8">{label}</td>
		<td className="">{value}</td>
	</tr>
);

const SumLine = () => (
	<tr>
		<td />
		<td className="relative h-8 before:block before:h-0 before:w-full before:border-b before:border-dashed before:border-current after:absolute after:-right-5 after:leading-[0px] after:content-['-']" />
	</tr>
);

export default ResultStep;
