import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "../i18n";
import { ChevronRight } from "../icons";
import { useCalculatorContext } from "./CalculatorContext";

const MAX_LENGTH = 140;

const Explanation = () => {
	const { t } = useTranslation();
	const { step } = useCalculatorContext();
	const [isOpen, setIsOpen] = useState(false);

	const text = t(`steps.${step}.help`);
	const clippedText = isOpen ? text : text.slice(0, MAX_LENGTH) + "...";

	const buttonText = useMemo(() => {
		if (isOpen) {
			return t(`steps.${step}.less-help`);
		}
		return t(`steps.${step}.more-help`);
	}, [isOpen, step]);

	const ref = useRef<HTMLDivElement>(null);
	const fullRef = useRef<HTMLDivElement>(null);
	const clippedRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const height = (isOpen ? fullRef.current?.clientHeight : clippedRef.current?.clientHeight) || 0;
		ref.current?.style.setProperty("height", `${height}px`);
	}, [isOpen]);

	return (
		<>
			<div ref={ref} className="relative w-full overflow-hidden transition-all duration-1000">
				<div
					ref={clippedRef}
					dangerouslySetInnerHTML={{ __html: clippedText }}
					data-text="clipped"
					className={`top-0 w-full transition-opacity ${isOpen ? "opacity-0" : "absolute "}`}
				/>
				<div
					ref={fullRef}
					dangerouslySetInnerHTML={{ __html: text }}
					data-text="full"
					className={`top-0 w-full transition-opacity absolute ${isOpen ? "opacity-0" : undefined}`}
				/>
			</div>
			<button
				ref={buttonRef}
				type="button"
				className="flex mt-2 items-center gap-2 pl-2 -ml-2 text-darkBlue underline"
				onClick={() => setIsOpen(!isOpen)}
			>
				{buttonText}
				<div className="w-8 h-8 bg-darkBlue text-white flex items items-center justify-center">
					<ChevronRight style={{ transform: isOpen ? "rotate(-90deg)" : "rotate(90deg)" }} />
				</div>
			</button>
		</>
	);
};

export default Explanation;
