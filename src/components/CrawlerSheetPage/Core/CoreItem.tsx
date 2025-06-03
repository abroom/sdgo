import { type ReactNode } from 'react';

export const CoreItem = ({
	children,
	htmlFor,
	label,
}: {
	readonly children: ReactNode;
	readonly htmlFor?: string;
	readonly label: string;
}) => {
	return (
		<>
			<div className="flex-grow min-h-14 p-2 pb-0 flex items-center text-xl overflow-auto">
				{children}
			</div>
			<label className="px-2 pb-1" htmlFor={htmlFor}>
				{label}
			</label>
		</>
	);
};
