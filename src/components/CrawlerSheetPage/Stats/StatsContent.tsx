import { memo } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { SectionHeader } from '../SectionHeader';

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
		<div className="content stats-content">
			<SectionHeader
				edit={{
					isToggled: editors.enabled.size > 0,
					handleClick: () => {
						if (editors.enabled.size > 0) {
							editors.disableAll();
						} else {
							editors.toggle(['stats']);
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
			<div className="values stats-items">
				<div className="stats-header grid grid-cols-3 text-center px-4 gap-2">
					<span>Name</span>
					<span>Score</span>
					<span>Mod</span>
				</div>
				{editors.enabled.has('stats') ? (
					<pre>TODO StatsEditor</pre>
				) : (
					<pre>TODO StatsList</pre>
				)}
			</div>
		</div>
	);
});
