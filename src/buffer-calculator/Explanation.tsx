import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "../i18n";
import { ChevronRight } from "../icons";
import { useCalculatorContext } from "./CalculatorContext";

const MAX_LENGTH = 140;

interface Props {
	text: string;
}

const Explanation = ({ text }: Props) => {
	const { t } = useTranslation();
	const { step } = useCalculatorContext();
	const [isOpen, setIsOpen] = useState(false);

	const clippedText = text.slice(0, MAX_LENGTH) + "...";

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
		buttonRef.current?.style.setProperty("width", `${isOpen ? 170 : 430}px`);
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(false);
	}, [step]);

	const toggleOpen = useCallback(() => setIsOpen((isOpen) => !isOpen), []);
	// button size moet transitie krijgen
	return (
		<>
			<div ref={ref} className="relative w-full overflow-hidden transition-all duration-300">
				<div
					ref={clippedRef}
					dangerouslySetInnerHTML={{ __html: clippedText }}
					data-text="clipped"
					className={`top-0 w-full transition-opacity duration-300 ${isOpen ? "opacity-0" : "absolute "}`}
				/>
				<div
					ref={fullRef}
					dangerouslySetInnerHTML={{ __html: text }}
					data-text="full"
					className={`top-0 w-full transition-opacity duration-300 absolute  ${
						isOpen ? "opacity-100" : "opacity-0"
					}`}
				/>
			</div>
			<button
				ref={buttonRef}
				type="button"
				className="flex mt-2 items-center justify-between gap-2 pl-2 -ml-2 text-button underline  transition-[width] duration-300"
				onClick={toggleOpen}
			>
				<span>{buttonText}</span>
				<div className="w-8 h-8 bg-button text-white flex items items-center justify-center">
					<ChevronRight style={{ transform: isOpen ? "rotate(-90deg)" : "rotate(90deg)" }} />
				</div>
			</button>
		</>
	);
};

export default Explanation;
