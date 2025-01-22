import React, { ReactNode } from 'react';

type InputProps = {
	type: 'checkbox' | 'text';
	name: string;
	className?: string;
	placeholder?: string;
	value?: string;
	checked?: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<InputProps> = ({
	type,
	name,
	className,
	placeholder,
	value,
	checked,
	onChange,
}): ReactNode => (
	<input
		className={className ?? ''}
		placeholder={placeholder ?? ''}
		name={name}
		type={type}
		value={value ?? ''}
		checked={checked ?? false}
		onChange={onChange}
	/>
);

export default Input;
