import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { AddItemButton } from '../AddItemButton';
import { ItemEditor } from '../ItemEditor';

export const SpellsTierEditor = ({
	tiers,
	index,
	editors,
	updateCrawlerSheet,
}: {
	readonly tiers: CrawlerSheet['spells']['tiers'];
	readonly index: number;
	readonly editors: Editors<CrawlerSheet['spells']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	return (
		<>
			{tiers[index].data.map((_, i) => (
				<ItemEditor
					key={i}
					placeholder={`Spell ${i + 1}`}
					value={tiers[index].data[i].name}
					persist={(value) => {
						updateCrawlerSheet({
							spells: {
								tiers: tiers.map((tier, tIdx) =>
									tIdx === index
										? {
												...tier,
												data: tiers[index].data.map((spell, sIdx) =>
													sIdx === i ? { ...spell, name: value } : spell,
												),
											}
										: tier,
								),
							},
						});
					}}
					remove={() => {
						updateCrawlerSheet({
							spells: {
								tiers: tiers.map((tier, tIdx) =>
									tIdx === index
										? {
												...tier,
												data: tier.data.filter((_, sIdx) => sIdx !== i),
											}
										: tier,
								),
							},
						});
					}}
					toggle={() => editors.toggle([`tiers.${index}.data`])}
				/>
			))}
			<AddItemButton
				label="Add Spell"
				addItem={() => {
					updateCrawlerSheet({
						spells: {
							tiers: tiers.map((tier, i) =>
								i === index
									? {
											...tier,
											data: [
												...tier.data,
												{
													name: '',
													forgotten: false,
													range: '',
													duration: '',
													mod: '',
													dc: '',
													effect: '',
													notes: '',
												},
											],
										}
									: tier,
							),
						},
					});
				}}
			/>
		</>
	);
};
