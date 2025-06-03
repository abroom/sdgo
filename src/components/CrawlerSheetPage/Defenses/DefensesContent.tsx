import { memo } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { SectionHeader } from '../SectionHeader';
import { DefensesAC } from './DefensesAC';
import { DefensesHP } from './DefensesHP';

export const DefensesContent = memo(function DefensesContent({
	defenses,
	editors,
	updateCrawlerSheet,
}: {
	readonly defenses: CrawlerSheet['defenses'];
	readonly editors: Editors<CrawlerSheet['defenses']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) {
	return (
		<div>
			<SectionHeader
				// edit={{
				// 	isToggled: editors.enabled.size > 0,
				// 	handleClick: () => {
				// 		if (editors.enabled.size > 0) {
				// 			editors.disableAll();
				// 		} else {
				// 			editors.toggle(['data']);
				// 		}
				// 	},
				// }}
				notes={{
					isEditing: editors.enabled.has('notes'),
					value: defenses.notes,
					persistValue: (value) =>
						updateCrawlerSheet({ defenses: { notes: value } }),
					toggleEditor: (isEnabled) => {
						editors.toggle(['notes'], isEnabled);
					},
				}}
			/>
			<div className="m-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
				<DefensesAC
					ac={defenses.ac}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
				<DefensesHP
					hp={defenses.hp}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			</div>
		</div>
	);
});
