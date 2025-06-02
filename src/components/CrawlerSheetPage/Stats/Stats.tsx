import { useContext, useState } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { Section } from '../Section';
import { StatsContent } from './StatsContent';

import './Stats.css';

export const Stats = () => {
	const [isContentVisible, setIsContentVisible] = useState(true);

	const {
		crawlerSheet: { stats },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const editors = useEditors<CrawlerSheet['stats']>();

	console.log('Stats render', { stats, editors });

	return (
		<Section>
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
		</Section>
	);
};
