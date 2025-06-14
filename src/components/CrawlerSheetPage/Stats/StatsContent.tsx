import { memo } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { SectionHeader } from '../SectionHeader';
import { StatsEditor } from './StatsEditor';
import { StatsItem } from './StatsItem';

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
			<div className="m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{editors.enabled.has('data') ? (
					<StatsEditor
						data={stats.data}
						editors={editors}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				) : (
					stats.data.map((_, index) => (
						<StatsItem
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
