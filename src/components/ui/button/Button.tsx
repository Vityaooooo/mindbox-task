import React, { PropsWithChildren, ReactNode, SyntheticEvent } from 'react';

type ButtonProps = {
	className?: string;
	testid?: string;
	id: string;
	type: 'button' | 'submit';
	disabled?: boolean;
	onClick?(e: SyntheticEvent): void;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
	className,
	testid,
	id,
	type,
	onClick,
	disabled,
	children,
}): ReactNode => (
	<button
		id={id}
		data-testid={testid}
		className={className ?? ''}
		type={type}
		onClick={onClick}
		disabled={disabled}>
		{children}
	</button>
);

export default Button;
