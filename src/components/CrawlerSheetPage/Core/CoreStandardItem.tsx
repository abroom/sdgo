import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';
import { isKeyExit } from '@/utils/IsKeyExit';

import { CoreItem } from './CoreItem';
import { standardItemLabelsByKey } from './constants';
import type { CoreStandardItemKey } from './types';

export const CoreStandardItem = ({
	core,
	itemKey,
	editors,
	updateCrawlerSheet,
}: {
	readonly core: CrawlerSheet['core'];
	readonly itemKey: CoreStandardItemKey;
	readonly editors: Editors<CrawlerSheet['core']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const [coreValue, setCoreValue] = useState(core[itemKey]);
	useEffect(() => {
		setCoreValue(core[itemKey]);
	}, [core, itemKey]);

	const persistTimeoutRef = useRef<number>(undefined);
	const handleChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setCoreValue(value);
			clearTimeout(persistTimeoutRef.current);
			persistTimeoutRef.current = setTimeout(() => {
				updateCrawlerSheet({ core: { [itemKey]: value } });
				persistTimeoutRef.current = undefined;
			}, 500);
		},
		[itemKey, updateCrawlerSheet],
	);

	if (!coreValue && !editors.enabled.has(itemKey)) {
		return null;
	}

	return (
		<button
			className="flex flex-col"
			disabled={editors.enabled.has(itemKey)}
			onClick={() => editors.toggle([itemKey])}
		>
			<CoreItem
				htmlFor={`core.${itemKey}`}
				label={standardItemLabelsByKey[itemKey]}
			>
				{editors.enabled.has(itemKey) ? (
					<input
						id={`core.${itemKey}`}
						autoFocus
						className="text-center"
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
					<p className="flex-grow py-1">{coreValue}</p>
				)}
			</CoreItem>
		</button>
	);
};
