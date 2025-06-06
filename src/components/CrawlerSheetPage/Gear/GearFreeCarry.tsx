import { useState } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { GearFreeCarryEditor } from './GearFreeCarryEditor';
import { GearFreeCarryItem } from './GearFreeCarryItem';

export const GearFreeCarry = ({
	freeCarry,
	editors,
	updateCrawlerSheet,
}: {
	readonly freeCarry: CrawlerSheet['gear']['freeCarry'];
	readonly editors: Editors<CrawlerSheet['gear']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const [isContentVisible, setIsContentVisible] = useState(true);

	return (
		<div className="border border-(--color-primary-3) rounded-md p-2 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2">
			<button
				className="border-none col-span-full p-2"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h3>Free Carry</h3>
			</button>
			{isContentVisible &&
				(editors.enabled.has('freeCarry') ? (
					<GearFreeCarryEditor
						freeCarry={freeCarry}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				) : (
					freeCarry.map((_, index) => (
						<GearFreeCarryItem
							key={index}
							freeCarry={freeCarry}
							index={index}
							editors={editors}
							updateCrawlerSheet={updateCrawlerSheet}
						/>
					))
				))}
		</div>
	);
};
