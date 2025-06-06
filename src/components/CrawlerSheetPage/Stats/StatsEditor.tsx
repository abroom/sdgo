import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { AddItemButton } from '../AddItemButton';
import { ItemEditor } from '../ItemEditor';

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
				<ItemEditor
					key={i}
					placeholder={`Stat ${i + 1}`}
					value={data[i].name}
					persist={(value) => {
						updateCrawlerSheet({
							stats: {
								data: data.map((s, idx) =>
									idx === i ? { ...s, name: value } : s,
								),
							},
						});
					}}
					remove={() => {
						updateCrawlerSheet({
							stats: {
								data: data.filter((_, idx) => idx !== i),
							},
						});
					}}
					toggle={() => editors.toggle(['data'])}
				/>
			))}
			{editors.enabled.has('data') && (
				<AddItemButton
					label="Add Stat"
					addItem={() => {
						updateCrawlerSheet({
							stats: {
								data: [...data, { name: '', score: '', mod: '' }],
							},
						});
					}}
				/>
			)}
		</>
	);
};
