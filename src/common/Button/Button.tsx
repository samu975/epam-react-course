import React from 'react';

interface ButtonProps {
	buttonText: string;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	preventDefault?: boolean;
}

const Button = (props: ButtonProps): JSX.Element => {
	return (
		<button
			disabled={props.disabled}
			onClick={(e) => {
				props.preventDefault && e.preventDefault();

				props.onClick && props.onClick();
			}}
			className={`${props.className}`}
		>
			{props.buttonText}
		</button>
	);
};

export default Button;
