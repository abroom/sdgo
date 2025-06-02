import { type ReactNode } from 'react';

export const CoreItem = ({
	children,
	label,
}: {
	readonly children: ReactNode;
	readonly label: string;
}) => {
	return (
		<>
			<div className="flex-grow min-h-14 p-2 pb-0 flex items-center text-xl overflow-auto">
				{children}
			</div>
			<p className="px-2 pb-1 text-sm text-center text-(--color-primary-3)">
				{label}
			</p>
		</>
	);
};
