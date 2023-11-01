import React from 'react';

interface TextAreaProps {
	className: string;
	id: string;
	label?: string;
	placeHolder?: string;
	minLegth?: number;
	onchange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = (props: TextAreaProps): JSX.Element => {
	return (
		<>
			<label htmlFor={`#${props.id}`}>{props.label}</label>
			<textarea
				id={props.id}
				className={`${props.className}`}
				placeholder={props.placeHolder}
				minLength={props.minLegth}
				onChange={props.onchange}
			/>
		</>
	);
};

export default TextArea;
