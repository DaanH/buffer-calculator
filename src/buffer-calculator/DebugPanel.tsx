import { useCalculatorContext } from './CalculatorContext';

const DebugPanel = () => {
	const { vars, touchedSteps } = useCalculatorContext();
	const isLocalhost = false; //window.location.hostname === 'localhost';
	return (
		isLocalhost && (
			<div className="my-2 rounded border-2 border-amber-300 p-2 font-mono text-xs">
				{JSON.stringify(touchedSteps, null, 2)}

				<hr />
				{Object.entries(vars).map(([key, value]) => (
					<div key={key}>
						<span className="inline-block w-40">{key}</span>
						{value}
					</div>
				))}
			</div>
		)
	);
};
export default DebugPanel;
