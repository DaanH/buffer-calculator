import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type Props = { disabledHint?: string } & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = ({ children, disabledHint, ...props }: Props) => (
	<button
		type="button"
		className="hover:bg-hover group relative bg-button px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
		{...props}
	>
		{disabledHint && (
			<div className="duration-400 absolute left-full top-0 hidden h-full -translate-x-4 transform items-center whitespace-nowrap border-2 border-l-0 border-button px-2 text-button opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-disabled:flex">
				selecteer onderwijsinstelling
			</div>
		)}
		{children}
	</button>
);

export default Button;
