import { memo } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { SectionHeader } from '../SectionHeader';
import { StatsEditor } from './StatsEditor';
import { StatsRow } from './StatsRow';

export const StatsContent = memo(function StatsContent({
	stats,
	editors,
	updateCrawlerSheet,
}: {
	readonly stats: CrawlerSheet['stats'];
	readonly editors: Editors<CrawlerSheet['stats']>;
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
					value: stats.notes,
					persistValue: (value) =>
						updateCrawlerSheet({ stats: { notes: value } }),
					toggleEditor: (isEnabled) => {
						editors.toggle(['notes'], isEnabled);
					},
				}}
			/>
			<div className="m-4 flex flex-col gap-4">
				{editors.enabled.has('data') ? (
					<StatsEditor
						data={stats.data}
						editors={editors}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				) : (
					stats.data.map((_, index) => (
						<StatsRow
							key={index}
							data={stats.data}
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
