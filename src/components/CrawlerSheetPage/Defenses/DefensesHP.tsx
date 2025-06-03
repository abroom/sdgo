import {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
} from 'react';
import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';
import { isKeyExit } from '@/utils/IsKeyExit';

export const DefensesHP = ({
	hp,
	editors,
	updateCrawlerSheet,
}: {
	readonly hp: CrawlerSheet['defenses']['hp'];
	readonly editors: Editors<CrawlerSheet['defenses']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const [hpDisplay, setHpDisplay] = useState({
		current: hp.current,
		max: hp.max,
	});
	useEffect(() => {
		setHpDisplay({ current: hp.current, max: hp.max });
	}, [hp]);

	const persistTimeoutRef = useRef<{ current?: number; max?: number }>({});

	const buildChangeHandler = useCallback(
		(field: 'current' | 'max') =>
			({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
				setHpDisplay((prev) => ({ ...prev, [field]: value }));
				clearTimeout(persistTimeoutRef.current[field]);
				persistTimeoutRef.current[field] = window.setTimeout(() => {
					updateCrawlerSheet({ defenses: { hp: { [field]: value } } });
					persistTimeoutRef.current[field] = undefined;
				}, 500);
			},
		[updateCrawlerSheet],
	);

	return (
		<button
			className="flex"
			onClick={() => editors.toggle(['hp'])}
			disabled={editors.enabled.has('hp')}
		>
			<div className="border-r border-dotted min-w-25 p-2">
				<h3>HP</h3>
				<label>Hit Points</label>
			</div>
			<div className="flex-grow flex items-center justify-center overflow-hidden">
				{(['current', 'max'] as const).map((field, idx) => (
					<Fragment key={field}>
						<div className="flex-grow flex items-center h-full max-w-[calc((100%-1rem)/2)] p-2">
							{editors.enabled.has('hp') ? (
								<input
									autoFocus
									className="h-full flex-grow text-center text-xl"
									onChange={buildChangeHandler(field)}
									onKeyDown={(e) => {
										if (isKeyExit(e)) {
											editors.toggle(['hp']);
										}
									}}
									value={hpDisplay[field]}
									type="text"
								/>
							) : (
								<p className="flex-grow text-4xl overflow-auto">
									{hpDisplay[field]}
								</p>
							)}
						</div>
						{idx === 0 && <p className="text-center text-4xl w-[1rem]">/</p>}
					</Fragment>
				))}
			</div>
		</button>
	);
};
