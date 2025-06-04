import { memo } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { SectionHeader } from '../SectionHeader';
import { WeaponsEditor } from './WeaponsEditor';
import { WeaponsItem } from './WeaponsItem';

export const WeaponsContent = memo(function WepaonsContent({
	weapons,
	editors,
	updateCrawlerSheet,
}: {
	readonly weapons: CrawlerSheet['weapons'];
	readonly editors: Editors<CrawlerSheet['weapons']>;
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
							editors.toggle(['data']);
						}
					},
				}}
				notes={{
					isEditing: editors.enabled.has('notes'),
					value: weapons.notes,
					persistValue: (value) =>
						updateCrawlerSheet({ weapons: { notes: value } }),
					toggleEditor: (isEnabled) => {
						editors.toggle(['notes'], isEnabled);
					},
				}}
			/>
			<div className="m-4 grid lg:grid-cols-2 gap-4">
				{editors.enabled.has('data') ? (
					<WeaponsEditor
						data={weapons.data}
						editors={editors}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				) : (
					weapons.data.map((_, index) => (
						<WeaponsItem
							key={index}
							data={weapons.data}
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
