import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { AddItemButton } from '../AddItemButton';
import { ItemEditor } from '../ItemEditor';

export const GearWealthEditor = ({
	wealth,
	editors,
	updateCrawlerSheet,
}: {
	readonly wealth: CrawlerSheet['gear']['wealth'];
	readonly editors: Editors<CrawlerSheet['gear']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	return (
		<>
			{wealth.map((_, i) => (
				<ItemEditor
					key={i}
					placeholder={`Wealth Type ${i + 1}`}
					value={wealth[i].type}
					persist={(value) => {
						updateCrawlerSheet({
							gear: {
								wealth: wealth.map((wealth, idx) =>
									idx === i ? { ...wealth, type: value } : wealth,
								),
							},
						});
					}}
					remove={() => {
						updateCrawlerSheet({
							gear: {
								wealth: wealth.filter((_, idx) => idx !== i),
							},
						});
					}}
					toggle={() => editors.toggle(['wealth', 'slots', 'freeCarry'])}
				/>
			))}
			<AddItemButton
				label="Add Wealth Type"
				addItem={() => {
					updateCrawlerSheet({
						gear: {
							wealth: [...wealth, { type: '', quantity: '' }],
						},
					});
				}}
			/>
		</>
	);
};
