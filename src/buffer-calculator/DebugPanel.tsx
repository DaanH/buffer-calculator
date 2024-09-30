import { useCalculatorContext } from "./CalculatorContext";

const DebugPanel = () => {
	const { vars, touchedSteps } = useCalculatorContext();

	return (
		<div className="font-mono text-xs p-2 my-2 border-2 rounded border-amber-300">
			{JSON.stringify(touchedSteps, null, 2)}

			<hr />
			{Object.entries(vars).map(([key, value]) => (
				<div key={key}>
					<span className="inline-block  w-40">{key}</span>
					{value}
				</div>
			))}
		</div>
	);
};
export default DebugPanel;
