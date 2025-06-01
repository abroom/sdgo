import { useContext } from 'react';

import classNames from 'classnames';

import type { EditorsControls } from '@/components/Editors/Editors';
import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import type { CrawlerSheet } from '@/types/CrawlerSheet';
import { isKeyExit } from '@/utils/IsKeyExit';

import { standardItemLabelsByKey } from './constants';
import type { CoreStandardItemKey } from './types';

export const CoreStandardItem = ({
	editorsControls: { editors, toggleEditors },
	itemKey,
}: {
	readonly editorsControls: EditorsControls<CrawlerSheet['core']>;
	readonly itemKey: CoreStandardItemKey;
}) => {
	const {
		crawlerSheet: { core },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	if (!core[itemKey] && !editors.has(itemKey)) {
		return null;
	}

	return (
		<button
			className={classNames('core-item')}
			disabled={editors.has(itemKey)}
			onClick={() => toggleEditors([itemKey])}
		>
			<div>
				{editors.has(itemKey) ? (
					<input
						autoFocus
						className="h-8"
						onChange={({ target: { value } }) =>
							updateCrawlerSheet({ core: { [itemKey]: value } })
						}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								toggleEditors([itemKey]);
							}
						}}
						type="text"
						value={core[itemKey]}
					/>
				) : (
					<p className="h-8 min-h-fit overflow-auto">{core[itemKey]}</p>
				)}
			</div>
			<p>{standardItemLabelsByKey[itemKey]}</p>
		</button>
	);
};
