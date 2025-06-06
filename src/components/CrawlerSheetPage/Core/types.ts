import type { CrawlerSheet } from '@/types/CrawlerSheet';

export type CoreStandardItemKey = keyof Omit<
	CrawlerSheet['core'],
	'name' | 'xp' | 'notes'
>;
