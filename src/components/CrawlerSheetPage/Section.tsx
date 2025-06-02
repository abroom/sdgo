import type { ReactNode } from 'react';

export const Section = ({ children }: { readonly children: ReactNode }) => {
	return (
		<section className="w-full bg-(--color-primary) rounded-lg">
			{children}
		</section>
	);
};
