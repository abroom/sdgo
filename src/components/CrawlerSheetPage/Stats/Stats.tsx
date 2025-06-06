import { useContext, useState } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { Section } from '../Section';
import { StatsContent } from './StatsContent';

export const Stats = () => {
	const {
		crawlerSheet: { stats },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const [isContentVisible, setIsContentVisible] = useState(true);

	const editors = useEditors<CrawlerSheet['stats']>();

	return (
		<Section>
			<button
				className="border-none w-full p-4"
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
