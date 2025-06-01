import { useContext } from 'react';

import type { EditorsControls } from '@/components/Editors/Editors';
import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { SectionHeader } from '../SectionHeader';
import { standardItemKeys } from './constants';
import { CoreStandardItem } from './CoreStandardItem';
import type { DeepKeyOf } from '@/types/DeepKeyOf';
import { CoreExperienceItem } from './CoreExperienceItem';

const headerEnableEditorKeys: DeepKeyOf<CrawlerSheet['core']>[] = [
	'name',
	...standardItemKeys,
	'xp.current',
	'xp.required',
];

export const CoreContent = ({
	editorsControls,
}: {
	readonly editorsControls: EditorsControls<CrawlerSheet['core']>;
}) => {
	const { editors, clearEditors, toggleEditors } = editorsControls;

	const {
		crawlerSheet: { core },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	return (
		<div className="content core-content">
			<SectionHeader
				edit={{
					isToggled: editors.size > 0,
					handleClick: () => {
						if (editors.size > 0) {
							clearEditors();
						} else {
							toggleEditors(headerEnableEditorKeys);
						}
					},
				}}
				notes={{
					isEditing: editors.has('notes'),
					value: core.notes,
					handleChange: ({ target: { value } }) =>
						updateCrawlerSheet({ core: { notes: value } }),
					toggleEditor: (isEnabled) => {
						toggleEditors(['notes'], isEnabled);
					},
				}}
			/>
			<div className="values core-items">
				{standardItemKeys.map((itemKey) => (
					<CoreStandardItem
						key={itemKey}
						editorsControls={editorsControls}
						itemKey={itemKey}
					/>
				))}
				<CoreExperienceItem editorsControls={editorsControls} />
			</div>
		</div>
	);
};
