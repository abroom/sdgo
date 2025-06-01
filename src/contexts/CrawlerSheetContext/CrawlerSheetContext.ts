import { createContext } from 'react';
import { CRAWLER_SHEET__MOCK } from '@/constants/CrawlerSheets/Mock';
import type { DeepPartial } from '@/types/DeepPartial';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

export const CrawlerSheetContext = createContext<{
	readonly crawlerSheet: CrawlerSheet;
	readonly updateCrawlerSheet: (
		crawlerSheetUpdates: DeepPartial<CrawlerSheet>,
	) => void;
}>({
	crawlerSheet: CRAWLER_SHEET__MOCK,
	updateCrawlerSheet: () => null,
});
