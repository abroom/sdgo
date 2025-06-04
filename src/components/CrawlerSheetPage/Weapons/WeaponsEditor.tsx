import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { ItemEditor } from '../ItemEditor';
import { AddItemButton } from '../AddItemButton';

export const WeaponsEditor = ({
	data,
	editors,
	updateCrawlerSheet,
}: {
	readonly data: CrawlerSheet['weapons']['data'];
	readonly editors: Editors<CrawlerSheet['weapons']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	return (
		<>
			{data.map((_, i) => (
				<ItemEditor
					key={i}
					placeholder={`Weapon ${i + 1}`}
					value={data[i].name}
					persist={(value) => {
						updateCrawlerSheet({
							weapons: {
								data: data.map((w, idx) =>
									idx === i ? { ...w, name: value } : w,
								),
							},
						});
					}}
					remove={() => {
						updateCrawlerSheet({
							weapons: {
								data: data.filter((_, idx) => idx !== i),
							},
						});
					}}
					toggle={() => editors.toggle(['data'])}
				/>
			))}
			<AddItemButton
				label="Add Weapon"
				addItem={() => {
					updateCrawlerSheet({
						weapons: {
							data: [
								...data,
								{ name: '', type: '', damage: '', range: '', notes: '' },
							],
						},
					});
				}}
			/>
		</>
	);
};
