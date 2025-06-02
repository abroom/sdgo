import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import classNames from 'classnames';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';
import { isKeyExit } from '@/utils/IsKeyExit';

import { standardItemLabelsByKey } from './constants';
import type { CoreStandardItemKey } from './types';

export const CoreStandardItem = ({
	core,
	editors,
	itemKey,
	updateCrawlerSheet,
}: {
	readonly core: CrawlerSheet['core'];
	readonly editors: Editors<CrawlerSheet['core']>;
	readonly itemKey: CoreStandardItemKey;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const [coreValue, setCoreValue] = useState(core[itemKey]);
	useEffect(() => {
		setCoreValue(core[itemKey]);
	}, [core, itemKey]);

	const persistTimoutRef = useRef<number>(null);
	const handleChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setCoreValue(value);

			if (persistTimoutRef.current) {
				clearTimeout(persistTimoutRef.current);
			}

			persistTimoutRef.current = setTimeout(() => {
				updateCrawlerSheet({ core: { [itemKey]: value } });
				persistTimoutRef.current = null;
			}, 500);
		},
		[itemKey, updateCrawlerSheet],
	);

	if (!coreValue && !editors.enabled.has(itemKey)) {
		return null;
	}

	return (
		<button
			className={classNames('core-item')}
			disabled={editors.enabled.has(itemKey)}
			onClick={() => editors.toggle([itemKey])}
		>
			<div>
				{editors.enabled.has(itemKey) ? (
					<input
						autoFocus
						className="h-8"
						onChange={handleChange}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								editors.toggle([itemKey]);
							}
						}}
						type="text"
						value={coreValue}
					/>
				) : (
					<p className="h-8 min-h-fit overflow-auto">{coreValue}</p>
				)}
			</div>
			<p>{standardItemLabelsByKey[itemKey]}</p>
		</button>
	);
};
