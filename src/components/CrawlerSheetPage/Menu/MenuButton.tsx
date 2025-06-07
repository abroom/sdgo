import type { ReactNode } from 'react';

export const MenuButton = ({
	children,
	onClick,
}: {
	readonly children: ReactNode;
	readonly onClick: () => void;
}) => {
	return (
		<button
			className="sm:border-none sm:rounded-none sm:h-10 sm:w-50 sm:p-0"
			onClick={onClick}
		>
			<h3>{children}</h3>
		</button>
	);
};
