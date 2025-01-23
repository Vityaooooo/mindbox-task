import React, { ReactNode } from 'react';

type InputProps = {
	type: 'checkbox' | 'text';
	name: string;
	className?: string;
	placeholder?: string;
	value?: string;
	checked?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
	type,
	name,
	className,
	placeholder,
	value,
	checked,
	onChange,
	onKeyDown
}): ReactNode => (
	<input
		className={className ?? ''}
		placeholder={placeholder ?? ''}
		name={name}
		type={type}
		value={value ?? ''}
		checked={checked ?? false}
		onChange={onChange}
		onKeyDown={onKeyDown}
	/>
);

export default Input;
