import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { SectionHeader } from '../SectionHeader';
import { SpellsTierEditor } from './SpellsTierEditor';
import { SpellsTierItem } from './SpellsTierItem';
import { useMemo } from 'react';

export const SpellsTierContent = ({
	tiers,
	index,
	editors,
	updateCrawlerSheet,
}: {
	readonly tiers: CrawlerSheet['spells']['tiers'];
	readonly editors: Editors<CrawlerSheet['spells']>;
	readonly index: number;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const tier = tiers[index];

	const tierEditorKeys = useMemo(() => {
		return [
			`tiers.${index}.data`,
			...tier.data.map<`tiers.${number}.data.${number}`>(
				(_, i) => `tiers.${index}.data.${i}`,
			),
			`tiers.${index}.notes`,
		] as const;
	}, [index, tier.data]);

	const tierEditors = useMemo(() => {
		const set = new Set<string>();
		tierEditorKeys.forEach((key) => {
			if (editors.enabled.has(key)) {
				set.add(key);
			}
		});
		return set;
	}, [editors.enabled, tierEditorKeys]);

	return (
		<div>
			<SectionHeader
				edit={{
					isToggled: tierEditors.size > 0,
					handleClick: () => {
						if (tierEditors.size > 0) {
							editors.toggle(tierEditorKeys, false);
						} else {
							editors.toggle([`tiers.${index}.data`]);
						}
					},
				}}
				notes={{
					isEditing: editors.enabled.has(`tiers.${index}.notes`),
					value: tier.notes,
					persistValue: (value) =>
						updateCrawlerSheet({
							spells: {
								tiers: tiers.map((t, i) =>
									i === index ? { ...t, notes: value } : t,
								),
							},
						}),
					toggleEditor: (isEnabled) => {
						editors.toggle([`tiers.${index}.notes`], isEnabled);
					},
				}}
			/>
			<div className="m-4 grid lg:grid-cols-2 gap-4">
				{editors.enabled.has(`tiers.${index}.data`) ? (
					<SpellsTierEditor
						tiers={tiers}
						index={index}
						editors={editors}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				) : (
					tier.data.map((_, spellIndex) => (
						<SpellsTierItem
							key={spellIndex}
							tiers={tiers}
							tierIndex={index}
							spellIndex={spellIndex}
							editors={editors}
							updateCrawlerSheet={updateCrawlerSheet}
						/>
					))
				)}
			</div>
		</div>
	);
};
