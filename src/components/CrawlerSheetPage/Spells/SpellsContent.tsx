import { memo } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { SectionHeader } from '../SectionHeader';
import { SpellsEditor } from './SpellsEditor';
import { SpellsTier } from './SpellsTier';

export const SpellsContent = memo(function WepaonsContent({
	spells,
	editors,
	updateCrawlerSheet,
}: {
	readonly spells: CrawlerSheet['spells'];
	readonly editors: Editors<CrawlerSheet['spells']>;
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
							editors.toggle(['tiers']);
						}
					},
				}}
				notes={{
					isEditing: editors.enabled.has('notes'),
					value: spells.notes,
					persistValue: (value) =>
						updateCrawlerSheet({ spells: { notes: value } }),
					toggleEditor: (isEnabled) => {
						editors.toggle(['notes'], isEnabled);
					},
				}}
			/>
			<div className="m-4 grid gap-4">
				{editors.enabled.has('tiers') ? (
					<SpellsEditor
						tiers={spells.tiers}
						editors={editors}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				) : (
					spells.tiers.map((_, index) => (
						<SpellsTier
							key={index}
							tiers={spells.tiers}
							index={index}
							editors={editors}
							updateCrawlerSheet={updateCrawlerSheet}
						/>
					))
				)}
			</div>
		</div>
	);
});
