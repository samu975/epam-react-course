import React from 'react';

interface InputProps {
	type: string;
	className: string;
	id: string;
	label?: string;
	placeHolder?: string;
	minLength?: number;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
}

const Input = (props: InputProps): JSX.Element => {
	return (
		<>
			<label htmlFor={`#${props.id}`}>{props.label}</label>
			<input
				id={props.id}
				type={props.type}
				className={`${props.className}`}
				placeholder={props.placeHolder}
				onChange={props.onChange}
				minLength={props.minLength}
				value={props.value}
			/>
		</>
	);
};

export default Input;
