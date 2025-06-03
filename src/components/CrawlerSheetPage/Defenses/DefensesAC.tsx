import { useEffect, useRef, useState, type ChangeEvent } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';
import { isKeyExit } from '@/utils/IsKeyExit';

export const DefensesAC = ({
	ac,
	editors,
	updateCrawlerSheet,
}: {
	readonly ac: CrawlerSheet['defenses']['ac'];
	readonly editors: Editors<CrawlerSheet['defenses']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const [acDisplay, setAcDisplay] = useState(ac);
	useEffect(() => {
		setAcDisplay(ac);
	}, [ac]);

	const persistAcTimeoutRef = useRef<number>(undefined);
	const handleAcChange = ({
		target: { value },
	}: ChangeEvent<HTMLInputElement>) => {
		setAcDisplay(value);
		clearTimeout(persistAcTimeoutRef.current);
		persistAcTimeoutRef.current = setTimeout(() => {
			updateCrawlerSheet({ defenses: { ac: value } });
			persistAcTimeoutRef.current = undefined;
		}, 500);
	};

	return (
		<button
			className="flex"
			disabled={editors.enabled.has('ac')}
			onClick={() => {
				editors.toggle(['ac']);
			}}
		>
			<div className="border-r border-dotted min-w-25 p-2">
				<h3>AC</h3>
				<label>Armor Class</label>
			</div>
			<div className="flex-grow p-2 overflow-hidden">
				{editors.enabled.has('ac') ? (
					<input
						className="h-full w-full text-center text-4xl"
						value={acDisplay}
						autoFocus
						onChange={handleAcChange}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								editors.toggle(['ac']);
							}
						}}
						type="text"
					/>
				) : (
					<p className="max-w-full text-5xl leading-[3.5rem] overflow-auto">
						{acDisplay}
					</p>
				)}
			</div>
		</button>
	);
};
