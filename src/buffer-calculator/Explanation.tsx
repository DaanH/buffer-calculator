import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import { ChevronRight } from '../icons';
import { useCalculatorContext } from './CalculatorContext';

const MIN_LENGTH = 140;

interface Props {
	text: string;
	buttonFirst?: boolean;
	minimizedSize?: number;
}

const Explanation = ({ text, buttonFirst = false, minimizedSize = MIN_LENGTH }: Props) => {
	const { t } = useTranslation();
	const { step } = useCalculatorContext();
	const [isOpen, setIsOpen] = useState(false);

	const clippedText = text.slice(0, minimizedSize) + (minimizedSize ? '...' : '');

	const buttonText = useMemo(() => {
		if (isOpen) {
			return t(`steps.${step}.less-help`);
		}
		return t(`steps.${step}.more-help`);
	}, [isOpen, step, t]);

	const ref = useRef<HTMLDivElement>(null);
	const fullRef = useRef<HTMLDivElement>(null);
	const clippedRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const height = (isOpen ? fullRef.current?.clientHeight : clippedRef.current?.clientHeight) || 0;
		ref.current?.style.setProperty('height', `${height}px`);
		buttonRef.current?.style.setProperty('width', isOpen ? '8rem' : '21rem');
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(false);
	}, [step]);

	const toggleOpen = useCallback(() => setIsOpen((isOpen) => !isOpen), []);
	// button size moet transitie krijgen

	const buttonEl = (
		<button
			ref={buttonRef}
			type="button"
			className="group mt-2 flex items-center justify-between gap-2 text-button underline transition-[width] duration-300"
			onClick={toggleOpen}
		>
			<div className="flex-shrink overflow-hidden whitespace-nowrap">{buttonText}</div>
			<div className="group-hover:bg-hover items flex h-8 w-8 flex-none items-center justify-center bg-button text-white">
				<ChevronRight style={{ transform: isOpen ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
			</div>
		</button>
	);

	return (
		<>
			{buttonFirst ? buttonEl : null}
			<div ref={ref} className="relative w-full overflow-hidden transition-all duration-300">
				<div
					ref={clippedRef}
					dangerouslySetInnerHTML={{ __html: clippedText }}
					data-text="clipped"
					className={`top-0 w-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'absolute'}`}
				/>
				<div
					ref={fullRef}
					dangerouslySetInnerHTML={{ __html: text }}
					data-text="full"
					className={`absolute top-0 w-full transition-opacity duration-300 ${
						isOpen ? 'opacity-100' : 'opacity-0'
					}`}
				/>
			</div>
			{buttonFirst ? null : buttonEl}
		</>
	);
};

export default Explanation;
