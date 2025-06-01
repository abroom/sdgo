import type { CoreStandardItemKey } from './types';

export const standardItemLabelsByKey: Record<CoreStandardItemKey, string> = {
	player: 'Player',
	class: 'Class',
	ancestry: 'Ancestry',
	background: 'Background',
	title: 'Title',
	alignment: 'Alignment',
	deity: 'Deity',
	lvl: 'Level',
};

export const standardItemKeys = Object.keys(
	standardItemLabelsByKey,
) as (keyof typeof standardItemLabelsByKey)[];
