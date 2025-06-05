import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { AddItemButton } from '../AddItemButton';
import { ItemEditor } from '../ItemEditor';

export const TalentsEditor = ({
	data,
	editors,
	updateCrawlerSheet,
}: {
	readonly data: CrawlerSheet['talents']['data'];
	readonly editors: Editors<CrawlerSheet['talents']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	return (
		<>
			{data.map((_, i) => (
				<ItemEditor
					key={i}
					placeholder={`Talent ${i + 1}`}
					value={data[i].label}
					persist={(value) => {
						updateCrawlerSheet({
							talents: {
								data: data.map((talent, idx) =>
									idx === i ? { ...talent, label: value } : talent,
								),
							},
						});
					}}
					remove={() => {
						updateCrawlerSheet({
							talents: {
								data: data.filter((_, idx) => idx !== i),
							},
						});
					}}
					toggle={() => editors.toggle(['data'])}
				/>
			))}
			<AddItemButton
				label="Add Talent"
				addItem={() => {
					updateCrawlerSheet({
						talents: {
							data: [...data, { label: '', value: '' }],
						},
					});
				}}
			/>
		</>
	);
};
