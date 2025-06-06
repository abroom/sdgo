import { memo } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { SectionHeader } from '../SectionHeader';
import { GearFreeCarry } from './GearFreeCarry';
import { GearSlots } from './GearSlots';
import { GearWealth } from './GearWealth';

export const GearContent = memo(function GearContent({
	gear,
	editors,
	updateCrawlerSheet,
}: {
	readonly gear: CrawlerSheet['gear'];
	readonly editors: Editors<CrawlerSheet['gear']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) {
	return (
		<div>
			<SectionHeader
				edit={{
					isToggled: editors.enabled.size > 0,
					handleClick: () => {
						if (editors.enabled.size > 0) {
							editors.disableAll();
						} else {
							editors.toggle(['wealth', 'slots', 'freeCarry']);
						}
					},
				}}
				notes={{
					isEditing: editors.enabled.has('notes'),
					value: gear.notes,
					persistValue: (value) =>
						updateCrawlerSheet({ gear: { notes: value } }),
					toggleEditor: (isEnabled) => {
						editors.toggle(['notes'], isEnabled);
					},
				}}
			/>
			<div className="m-4 grid gap-4">
				<GearWealth
					wealth={gear.wealth}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
				<GearSlots
					slots={gear.slots}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
				<GearFreeCarry
					freeCarry={gear.freeCarry}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			</div>
		</div>
	);
});
