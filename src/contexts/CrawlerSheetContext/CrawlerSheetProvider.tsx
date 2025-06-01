import { useCallback, useState, type ReactNode } from 'react';

import { CRAWLER_SHEET__MOCK } from '@/constants/CrawlerSheets/Mock';
import type { CrawlerSheet } from '@/types/CrawlerSheet';
import type { DeepPartial } from '@/types/DeepPartial';

import { CrawlerSheetContext } from './CrawlerSheetContext';
import { deepMerge } from '@/utils/DeepMerge';

export const CrawlerSheetProvider = ({
	children,
}: {
	readonly children: ReactNode;
}) => {
	const [crawlerSheet, setCrawlerSheet] = useState(CRAWLER_SHEET__MOCK);

	const updateCrawlerSheet = useCallback(
		(crawlerSheetUpdates: DeepPartial<CrawlerSheet>) => {
			setCrawlerSheet((prevSheet) => deepMerge(prevSheet, crawlerSheetUpdates));
		},
		[setCrawlerSheet],
	);

	return (
		<CrawlerSheetContext.Provider
			value={{
				crawlerSheet,
				updateCrawlerSheet,
			}}
		>
			{children}
		</CrawlerSheetContext.Provider>
	);
};
