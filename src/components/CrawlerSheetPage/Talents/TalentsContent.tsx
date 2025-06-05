import { memo } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { SectionHeader } from '../SectionHeader';
import { TalentsEditor } from './TalentsEditor';
import { TalentsItem } from './TalentsItem';

export const TalentsContent = memo(function TalentsContent({
	talents,
	editors,
	updateCrawlerSheet,
}: {
	readonly talents: CrawlerSheet['talents'];
	readonly editors: Editors<CrawlerSheet['talents']>;
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
					value: talents.notes,
					persistValue: (value) =>
						updateCrawlerSheet({ talents: { notes: value } }),
					toggleEditor: (isEnabled) => {
						editors.toggle(['notes'], isEnabled);
					},
				}}
			/>
			<div className="m-4 grid gap-4">
				{editors.enabled.has('data') ? (
					<TalentsEditor
						data={talents.data}
						editors={editors}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				) : (
					talents.data.map((_, index) => (
						<TalentsItem
							key={index}
							data={talents.data}
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
