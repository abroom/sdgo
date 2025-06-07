import { useState } from 'react';

import { LoadFile } from './MenuButtons/LoadFile';
import { SaveFile } from './MenuButtons/SaveFile';
import { LoadTemplate } from './MenuButtons/LoadTemplate';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Dialog } from '@/components/Dialog/Dialog';

export const Menu = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
			<div className="fixed hidden sm:flex items-center justify-center gap-2 border-t border-(--color-primary) h-10 w-full bg-(--color-primary) shadow-md shadow-(color:--color-primary-4)">
				<SaveFile />
				<LoadFile />
				<LoadTemplate />
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
							<SaveFile />
							<LoadFile />
							<LoadTemplate />
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
