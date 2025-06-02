import { memo } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';
import type { DeepKeyOf } from '@/types/DeepKeyOf';

import { SectionHeader } from '../SectionHeader';
import { standardItemKeys } from './constants';
import { CoreExperienceItem } from './CoreExperienceItem';
import { CoreStandardItem } from './CoreStandardItem';

const headerEnableEditorKeys: DeepKeyOf<CrawlerSheet['core']>[] = [
	'name',
	...standardItemKeys,
	'xp.current',
	'xp.required',
];

export const CoreContent = memo(function CoreContent({
	core,
	editors,
	updateCrawlerSheet,
}: {
	readonly core: CrawlerSheet['core'];
	readonly editors: Editors<CrawlerSheet['core']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) {
	return (
		<div className="content core-content">
			<SectionHeader
				edit={{
					isToggled: editors.enabled.size > 0,
					handleClick: () => {
						if (editors.enabled.size > 0) {
							editors.disableAll();
						} else {
							editors.toggle(headerEnableEditorKeys);
						}
					},
				}}
				notes={{
					isEditing: editors.enabled.has('notes'),
					value: core.notes,
					persistValue: (value) =>
						updateCrawlerSheet({ core: { notes: value } }),
					toggleEditor: (isEnabled) => {
						editors.toggle(['notes'], isEnabled);
					},
				}}
			/>
			<div className="values core-items">
				{standardItemKeys.map((itemKey) => (
					<CoreStandardItem
						key={itemKey}
						core={core}
						editors={editors}
						itemKey={itemKey}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				))}
				<CoreExperienceItem
					editors={editors}
					xp={core.xp}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			</div>
		</div>
	);
});
