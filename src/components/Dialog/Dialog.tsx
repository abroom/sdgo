import type { ReactNode } from 'react';

export const Dialog = ({ children }: { readonly children: ReactNode }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-primary)/75 backdrop-blur-xs">
			<div className="sm:rounded-lg shadow-[0_0_16px_var(--color-secondary)] shadow-(color:--color-secondary) p-6 min-h-full sm:min-h-50 w-full sm:max-w-md flex flex-col bg-(--color-primary)">
				{children}
			</div>
		</div>
	);
};
