import type { ReactNode } from 'react';

export const Section = ({ children }: { readonly children: ReactNode }) => {
	return (
		<section className="border border-(--color-primary-2) w-full bg-(--color-primary) rounded-lg">
			{children}
		</section>
	);
};
