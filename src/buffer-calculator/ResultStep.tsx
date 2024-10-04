import { useMemo } from 'react';
import { useTranslation } from '../i18n';
import { useCalculatorContext } from './CalculatorContext';
import Explanation from './Explanation';
import Progress from './Progress';
import { getResults } from './calculations';

const ResultStep = () => {
	const { step, vars, setStep, flow } = useCalculatorContext();
	const { t } = useTranslation();
	const results = useMemo(() => getResults(vars, flow), [flow, vars]);
	return (
		<div className="leading-5">
			<Progress />

			<h3 className="text-xl font-bold my-4">{t(`steps.${step}.title`)}</h3>

			<div className="bg-white p-4 leading-normal">
				<table className="mx-auto">
					<ResultLine label={t('result.total')} value={results.total} />
					<ResultLine label={t('result.private')} value={results.private} />

					<tr>
						<td />
						<td className="relative h-8  before:block before:h-0 before:w-full before:border-b before:border-dashed before:border-current after:absolute after:-right-5 after:leading-[0px] after:content-['-']" />
					</tr>

					<ResultLine label={t('result.real')} value={results.real} />
					<ResultLine label={t('result.normative')} value={results.normative} />

					<tr>
						<td />
						<td className="relative my-4 h-8  before:block before:h-0 before:w-full before:border-b before:border-dashed before:border-current after:absolute after:-right-5 after:leading-[0px] after:content-['-']" />
					</tr>

					<ResultLine label={t('result.excess')} value={results.excess} className="font-bold" />
					<tr className="text-left italic h-20">
						<td colSpan={2}>
							{t('result.ratio')}: {results.ratio}
						</td>
					</tr>
				</table>
				<div className="text-xs text-left">{t('result.disclaimer')}</div>
			</div>
			<Explanation text={t(`result.help.${flow}`)} buttonFirst minimizedSize={0} />

			<div className="font-mono text-xs p-2 my-2 border-2 rounded border-amber-300">
				{Object.entries(vars).map(([key, value]) => (
					<div key={key}>
						<span className="inline-block  w-60">{key}</span>
						{value}
					</div>
				))}
			</div>
			<button className="bg-button py-2 px-3 text-white" type="button" onClick={() => setStep(0)}>
				{t('result.restart')}
			</button>
		</div>
	);
};

const ResultLine = ({ label, value, className = '' }: { label: string; value: string; className?: string }) => (
	<tr className={`text-right ${className}`}>
		<td className="pr-8">{label}</td>
		<td className="">{value}</td>
	</tr>
);
export default ResultStep;
