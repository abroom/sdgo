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
import { CoreItemButton } from './CoreItemButton';

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

	const persistCurrentTimeoutRef = useRef<number>(undefined);
	const handleCurrentChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setXpCurrent(value);
			clearTimeout(persistCurrentTimeoutRef.current);
			persistCurrentTimeoutRef.current = setTimeout(() => {
				updateCrawlerSheet({ core: { xp: { current: value } } });
				persistCurrentTimeoutRef.current = undefined;
			}, 200);
		},
		[updateCrawlerSheet],
	);

	const persistRequiredTimeoutRef = useRef<number>(undefined);
	const handleRequiredChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setXpRequired(value);
			clearTimeout(persistRequiredTimeoutRef.current);
			persistRequiredTimeoutRef.current = setTimeout(() => {
				updateCrawlerSheet({ core: { xp: { required: value } } });
				persistRequiredTimeoutRef.current = undefined;
			}, 200);
		},
		[updateCrawlerSheet],
	);

	if (!xpCurrent && !xpRequired && !editors.enabled.has('xp')) {
		return null;
	}

	return (
		<CoreItemButton
			disabled={editors.enabled.has('xp')}
			label={'Experience'}
			onClick={() => editors.toggle(['xp'])}
		>
			<div className="flex-grow max-w-full flex gap-[0.5rem] items-center justify-center">
				<div className="flex-grow border-x-0 border-t-0 max-w-[calc((100%-1.5rem)/2)]">
					{editors.enabled.has('xp') ? (
						<input
							autoFocus
							className="flex-grow px-2 h-8 text-right"
							onChange={handleCurrentChange}
							onKeyDown={(e) => {
								if (isKeyExit(e)) {
									editors.toggle(['xp']);
								}
							}}
							type="text"
							value={xpCurrent}
						/>
					) : (
						<p className="flex-grow px-2 h-8 min-h-fit text-right leading-[2rem] overflow-auto">
							{xpCurrent}
						</p>
					)}
				</div>
				<p className="px-0 w-[0.5rem] text-center">/</p>
				<div className="flex-grow border-x-0 border-t-0 max-w-[calc((100%-1.5rem)/2)]">
					{editors.enabled.has('xp') ? (
						<input
							autoFocus
							className="flex-grow px-2 h-8 text-left"
							onChange={handleRequiredChange}
							onKeyDown={(e) => {
								if (isKeyExit(e)) {
									editors.toggle(['xp']);
								}
							}}
							type="text"
							value={xpRequired}
						/>
					) : (
						<p className="flex-grow px-2 h-8 min-h-fit text-left leading-[2rem] overflow-auto">
							{xpRequired}
						</p>
					)}
				</div>
			</div>
		</CoreItemButton>
	);
};
