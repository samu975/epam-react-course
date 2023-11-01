import React from 'react';

interface ButtonProps {
	buttonText: string;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
}

const Button = (props: ButtonProps): JSX.Element => {
	return (
		<button
			disabled={props.disabled}
			onClick={(e) => {
				e.preventDefault();
				props.onClick && props.onClick();
			}}
			className={`${props.className}`}
		>
			{props.buttonText}
		</button>
	);
};

export default Button;
