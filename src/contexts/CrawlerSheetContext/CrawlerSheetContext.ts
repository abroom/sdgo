import { createContext } from 'react';
import { CRAWLER_SHEET__BLANK } from '@/constants/CrawlerSheets/Blank';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

export const CrawlerSheetContext = createContext<{
	readonly crawlerSheet: CrawlerSheet;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}>({
	crawlerSheet: CRAWLER_SHEET__BLANK,
	updateCrawlerSheet: () => null,
});
