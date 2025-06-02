import PlusCircleIcon from '@heroicons/react/24/solid/PlusCircleIcon';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { StatsEditorRow } from './StatsEditorRow';

export const StatsEditor = ({
	data,
	editors,
	updateCrawlerSheet,
}: {
	readonly data: CrawlerSheet['stats']['data'];
	readonly editors: Editors<CrawlerSheet['stats']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	return (
		<>
			{data.map((_, i) => (
				<StatsEditorRow
					key={i}
					index={i}
					data={data}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			))}
			<button
				className="flex gap-2 size-fit p-2 border rounded self-center"
				onClick={() => {
					updateCrawlerSheet({
						stats: {
							data: [...data, { name: '', score: '', mod: '' }],
						},
					});
				}}
			>
				<PlusCircleIcon width={24} />
				Add Stat
			</button>
		</>
	);
};
