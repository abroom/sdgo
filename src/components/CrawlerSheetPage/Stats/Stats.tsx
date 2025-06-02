import { useContext, useState } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { StatsContent } from './StatsContent';

export const Stats = () => {
	const [isContentVisible, setIsContentVisible] = useState(true);

	const {
		crawlerSheet: { stats },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const editors = useEditors<CrawlerSheet['stats']>();

	console.log('Stats render', { stats, editors });

	return (
		<section className="stats">
			<button
				className="title"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Stats</h2>
			</button>
			{isContentVisible && (
				<StatsContent
					stats={stats}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			)}
		</section>
	);
};
