import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { AddItemButton } from '../AddItemButton';
import { ItemEditor } from '../ItemEditor';

export const SpellsEditor = ({
	tiers,
	editors,
	updateCrawlerSheet,
}: {
	readonly tiers: CrawlerSheet['spells']['tiers'];
	readonly editors: Editors<CrawlerSheet['spells']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	return (
		<>
			{tiers.map((_, i) => (
				<ItemEditor
					key={i}
					placeholder={`Tier ${i + 1}`}
					value={tiers[i].name}
					persist={(value) => {
						updateCrawlerSheet({
							spells: {
								tiers: tiers.map((tier, idx) =>
									idx === i ? { ...tier, name: value } : tier,
								),
							},
						});
					}}
					remove={() => {
						updateCrawlerSheet({
							spells: {
								tiers: tiers.filter((_, idx) => idx !== i),
							},
						});
					}}
					toggle={() => editors.toggle(['tiers'])}
				/>
			))}
			<AddItemButton
				label="Add Tier"
				addItem={() => {
					updateCrawlerSheet({
						spells: {
							tiers: [...tiers, { name: '', data: [], notes: '' }],
						},
					});
				}}
			/>
		</>
	);
};
