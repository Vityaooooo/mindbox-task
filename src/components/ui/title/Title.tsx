import React, { ReactNode } from 'react';

type TitleProps = {
	children: ReactNode;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	className?: string;
};

const Title: React.FC<TitleProps> = ({
	children,
	level = 1,
	className = '',
}): ReactNode => {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;

	return <Tag className={className}>{children}</Tag>;
};

export default Title;
