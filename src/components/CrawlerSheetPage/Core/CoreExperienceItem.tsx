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

export const CoreExperienceItem = ({
	xp,
	editors,
	updateCrawlerSheet,
}: {
	readonly xp: CrawlerSheet['core']['xp'];
	readonly editors: Editors<CrawlerSheet['core']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const [xpCurrent, setXpCurrent] = useState(xp.current);
	const [xpRequired, setXpRequired] = useState(xp.required);
	useEffect(() => {
		setXpCurrent(xp.current);
		setXpRequired(xp.required);
	}, [xp]);

	const persistCurrentTimeoutRef = useRef<number>(null);
	const persistRequiredTimeoutRef = useRef<number>(null);

	const handleCurrentChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setXpCurrent(value);
			if (persistCurrentTimeoutRef.current) {
				clearTimeout(persistCurrentTimeoutRef.current);
			}
			persistCurrentTimeoutRef.current = setTimeout(() => {
				updateCrawlerSheet({ core: { xp: { current: value } } });
				persistCurrentTimeoutRef.current = null;
			}, 500);
		},
		[updateCrawlerSheet],
	);
	const handleRequiredChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setXpRequired(value);
			if (persistRequiredTimeoutRef.current) {
				clearTimeout(persistRequiredTimeoutRef.current);
			}
			persistRequiredTimeoutRef.current = setTimeout(() => {
				updateCrawlerSheet({ core: { xp: { required: value } } });
				persistRequiredTimeoutRef.current = null;
			}, 500);
		},
		[updateCrawlerSheet],
	);

	if (
		!xpCurrent &&
		!xpRequired &&
		!editors.enabled.has('xp.current') &&
		!editors.enabled.has('xp.required')
	) {
		return null;
	}

	return (
		<div className="core-item">
			<div className="flex gap-[0.5rem]">
				{editors.enabled.has('xp.current') ? (
					<input
						autoFocus
						className="flex-grow px-2 h-8 max-w-[calc((100%-1.5rem)/2)] text-right"
						onChange={handleCurrentChange}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								editors.toggle(['xp.current']);
							}
						}}
						type="text"
						value={xpCurrent}
					/>
				) : (
					<button
						className="flex-grow max-w-[calc((100%-1.5rem)/2)]"
						onClick={() => editors.toggle(['xp.current'])}
					>
						<p className="px-2 h-8 min-h-fit justify-end overflow-auto">
							{xpCurrent}
						</p>
					</button>
				)}
				<p className="px-0 w-[0.5rem] text-center">/</p>
				{editors.enabled.has('xp.required') ? (
					<input
						autoFocus
						className="flex-grow px-2 h-8 max-w-[calc((100%-1.5rem)/2)] text-left"
						onChange={handleRequiredChange}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								editors.toggle(['xp.required']);
							}
						}}
						type="text"
						value={xpRequired}
					/>
				) : (
					<button
						className="flex-grow max-w-[calc((100%-1.5rem)/2)]"
						onClick={() => editors.toggle(['xp.required'])}
					>
						<p className="px-2 h-8 min-h-fit justify-start overflow-auto">
							{xpRequired}
						</p>
					</button>
				)}
			</div>
			<p>Experience</p>
		</div>
	);
};
