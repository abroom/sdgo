import { type ReactNode } from 'react';

export const CoreItemButton = ({
	children,
	disabled,
	htmlFor,
	label,
	onClick,
}: {
	readonly children: ReactNode;
	readonly disabled?: boolean;
	readonly htmlFor?: string;
	readonly label: string;
	readonly onClick: () => void;
}) => {
	return (
		<button className="flex flex-col" disabled={disabled} onClick={onClick}>
			<div className="flex-grow min-h-14 p-2 pb-0 flex items-center text-xl overflow-auto">
				{children}
			</div>
			<label className="px-2 pb-1" htmlFor={htmlFor}>
				{label}
			</label>
		</button>
	);
};
