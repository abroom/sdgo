import { useState } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { GearSlotsEditor } from './GearSlotsEditor';
import { GearSlotsItem } from './GearSlotsItem';

export const GearSlots = ({
	slots,
	editors,
	updateCrawlerSheet,
}: {
	readonly slots: CrawlerSheet['gear']['slots'];
	readonly editors: Editors<CrawlerSheet['gear']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const [isContentVisible, setIsContentVisible] = useState(true);

	return (
		<div className="border border-(--color-primary-3) rounded-md p-2 grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-2">
			<button
				className="border-none col-span-full p-2"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h3>Slots</h3>
			</button>
			{isContentVisible &&
				(editors.enabled.has('slots') ? (
					<GearSlotsEditor
						slots={slots}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				) : (
					slots.map((_, index) => (
						<GearSlotsItem
							key={index}
							slots={slots}
							index={index}
							editors={editors}
							updateCrawlerSheet={updateCrawlerSheet}
						/>
					))
				))}
		</div>
	);
};
