import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import clsx from 'clsx/lite';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';
import { deepCopy } from '@/utils/DeepCopy';
import { isKeyExit } from '@/utils/IsKeyExit';
import { resizeElement } from '@/utils/ResizeElement';

export const SpellsTierItem = ({
	tiers,
	tierIndex,
	spellIndex,
	editors,
	updateCrawlerSheet,
}: {
	readonly tiers: CrawlerSheet['spells']['tiers'];
	readonly tierIndex: number;
	readonly spellIndex: number;
	readonly editors: Editors<CrawlerSheet['spells']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const { editorKey, editorEnabled } = useMemo(() => {
		const editorKey: `tiers.${number}.data.${number}` = `tiers.${tierIndex}.data.${spellIndex}`;
		const editorEnabled = editors.enabled.has(editorKey);
		return { editorKey, editorEnabled };
	}, [tierIndex, spellIndex, editors.enabled]);

	const [spellDisplay, setSpellDisplay] = useState(
		deepCopy(tiers[tierIndex].data[spellIndex]),
	);
	useEffect(() => {
		setSpellDisplay(deepCopy(tiers[tierIndex].data[spellIndex]));
	}, [tiers, tierIndex, spellIndex]);

	const persistTimeoutRefs = useRef<Record<string, number | undefined>>({});

	const handleChange = useCallback(
		(field: keyof CrawlerSheet['spells']['tiers'][number]['data'][number]) =>
			({
				target: { value },
			}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setSpellDisplay((prev) => ({ ...prev, [field]: value }));
				clearTimeout(persistTimeoutRefs.current[field]);
				persistTimeoutRefs.current[field] = window.setTimeout(() => {
					updateCrawlerSheet({
						spells: {
							tiers: tiers.map((tier, i) =>
								i === tierIndex
									? {
											...tier,
											data: tier.data.map((spell, j) =>
												j === spellIndex ? { ...spell, [field]: value } : spell,
											),
										}
									: tier,
							),
						},
					});
					persistTimeoutRefs.current[field] = undefined;
				}, 500);
			},
		[tiers, tierIndex, spellIndex, updateCrawlerSheet],
	);

	return (
		<button
			className="p-2 flex flex-col"
			disabled={editorEnabled}
			onClick={() => {
				editors.toggle([editorKey]);
			}}
		>
			<h4 className="text-left">
				{spellDisplay.name || `Spell ${spellIndex + 1}`}
			</h4>
			<div
				className={clsx(
					'm-2 border-t border-(--color-primary-2) flex-grow p-2',
					'grid grid-cols-2 sm:grid-cols-4 gap-2',
				)}
			>
				{(['range', 'duration', 'mod', 'dc'] as const).map((item, i) => (
					<div key={item}>
						<div className="h-full flex flex-col">
							{editorEnabled ? (
								<input
									className={clsx(
										'p-1 text-center',
										item === 'dc'
											? 'placeholder:uppercase'
											: 'placeholder:capitalize',
									)}
									type="text"
									value={spellDisplay[item] || ''}
									placeholder={item}
									onChange={handleChange(item)}
									onKeyDown={(e) => {
										if (isKeyExit(e)) {
											editors.toggle([editorKey]);
										}
									}}
									autoFocus={i === 0}
								/>
							) : (
								<h4 className="flex-grow flex items-center justify-center">
									<span className="overflow-auto">{spellDisplay[item]}</span>
								</h4>
							)}
							<label
								className={clsx(item === 'dc' ? 'uppercase' : 'capitalize')}
							>
								{item}
							</label>
						</div>
					</div>
				))}
			</div>
			{editorEnabled ? (
				<div className="p-2 pt-0">
					<textarea
						className="p-2"
						onChange={handleChange('effect')}
						onFocus={resizeElement}
						onKeyDown={(e) => {
							if (isKeyExit(e, true)) {
								editors.toggle([editorKey]);
							} else {
								resizeElement(e);
							}
						}}
						placeholder="Effect"
						value={spellDisplay.effect}
					/>
				</div>
			) : (
				!!spellDisplay.notes && (
					<div className="p-2 pt-0">
						<p className="rounded-md p-2 bg-(--color-primary-2) text-left whitespace-pre-wrap">
							{spellDisplay.notes}
						</p>
					</div>
				)
			)}
			{editorEnabled ? (
				<div className="p-2 pt-0">
					<textarea
						className="p-2"
						onChange={handleChange('notes')}
						onFocus={resizeElement}
						onKeyDown={(e) => {
							if (isKeyExit(e, true)) {
								editors.toggle([editorKey]);
							} else {
								resizeElement(e);
							}
						}}
						placeholder="Notes"
						value={spellDisplay.notes}
					/>
				</div>
			) : (
				!!spellDisplay.notes && (
					<div className="p-2 pt-0">
						<p className="rounded-md p-2 bg-(--color-primary-2) text-left whitespace-pre-wrap">
							{spellDisplay.notes}
						</p>
					</div>
				)
			)}
		</button>
	);
};
