import { useState } from 'react';

import { Bars3Icon } from '@heroicons/react/24/solid';
import { Dialog } from '@/components/Dialog/Dialog';
import { MenuContent } from './MenuContent';

export const Menu = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
			<div className="fixed inset-0 hidden sm:flex items-center justify-center gap-2 border-t border-(--color-primary) h-10 w-full bg-(--color-primary) shadow-md shadow-(color:--color-primary-4)">
				<MenuContent closeMenu={() => setIsExpanded(false)} />
			</div>
			<div className="hidden sm:block h-10" />
			<div className="sm:hidden">
				<button
					className="fixed top-5 left-5 p-1 bg-(--color-primary) shadow-(--highlight)"
					onClick={() => setIsExpanded(true)}
				>
					<Bars3Icon width={24} />
				</button>
				{isExpanded && (
					<Dialog>
						<div className="flex-grow flex flex-col gap-2">
							<MenuContent closeMenu={() => setIsExpanded(false)} />
						</div>
						<button onClick={() => setIsExpanded(false)}>
							<h3>Close</h3>
						</button>
					</Dialog>
				)}
			</div>
		</>
	);
};
