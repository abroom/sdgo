import {
	type ChangeEvent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import TrashIcon from '@heroicons/react/24/solid/TrashIcon';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';
import { isKeyExit } from '@/utils/IsKeyExit';

export const StatsEditorRow = memo(function StatsEditorRow({
	data,
	index,
	editors,
	updateCrawlerSheet,
}: {
	readonly data: CrawlerSheet['stats']['data'];
	readonly index: number;
	readonly editors: Editors<CrawlerSheet['stats']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) {
	console.log('StatsEditorRow render', { data, index, editors });

	const [statName, setStatName] = useState(data[index].name);
	useEffect(() => {
		setStatName(data[index].name);
	}, [data, index]);

	const persistTimeoutRef = useRef<number>(undefined);
	const handleChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setStatName(value);
			clearTimeout(persistTimeoutRef.current);
			persistTimeoutRef.current = setTimeout(() => {
				updateCrawlerSheet({
					stats: {
						data: data.map((s, i) => (i === index ? { ...s, name: value } : s)),
					},
				});
				persistTimeoutRef.current = undefined;
			}, 500);
		},
		[data, index, updateCrawlerSheet],
	);

	return (
		<div>
			<span className="flex gap-2 items-center justify-center p-2">
				<input
					className="text-xl h-[2.6rem] border rounded px-2"
					type="text"
					value={statName}
					placeholder="Stat Name"
					onChange={handleChange}
					onKeyDown={(e) => {
						if (isKeyExit(e)) {
							editors.toggle([`data`]);
						}
					}}
				/>
				<button
					className="p-2 text-red-500"
					onClick={() => {
						clearTimeout(persistTimeoutRef.current);
						updateCrawlerSheet({
							stats: {
								data: data.filter((_, i) => i !== index),
							},
						});
					}}
				>
					<TrashIcon width={24} />
				</button>
			</span>
		</div>
	);
});
