import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';
import { deepCopy } from '@/utils/DeepCopy';
import { isKeyExit } from '@/utils/IsKeyExit';
import { resizeElement } from '@/utils/ResizeElement';

export const GearFreeCarryItem = ({
	freeCarry,
	index,
	editors,
	updateCrawlerSheet,
}: {
	readonly freeCarry: CrawlerSheet['gear']['freeCarry'];
	readonly index: number;
	readonly editors: Editors<CrawlerSheet['gear']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const { editorKey, editorEnabled } = useMemo(() => {
		const editorKey: `freeCarry.${number}` = `freeCarry.${index}`;
		const editorEnabled = editors.enabled.has(editorKey);
		return { editorKey, editorEnabled };
	}, [editors.enabled, index]);

	const [freeCarryDisplay, setFreeCarryDisplay] = useState(
		deepCopy(freeCarry[index]),
	);
	useEffect(() => {
		setFreeCarryDisplay(deepCopy(freeCarry[index]));
	}, [freeCarry, index]);

	const persistTimeoutRefs = useRef<Record<string, number | undefined>>({});

	const handleChange = useCallback(
		(field: keyof CrawlerSheet['gear']['freeCarry'][number]) =>
			({
				target: { value },
			}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setFreeCarryDisplay((prev) => ({ ...prev, [field]: value }));
				clearTimeout(persistTimeoutRefs.current[field]);
				persistTimeoutRefs.current[field] = window.setTimeout(() => {
					updateCrawlerSheet({
						gear: {
							freeCarry: freeCarry.map((w, i) =>
								i === index ? { ...w, [field]: value } : w,
							),
						},
					});
					persistTimeoutRefs.current[field] = undefined;
				}, 500);
			},
		[freeCarry, index, updateCrawlerSheet],
	);

	return (
		<button
			className="flex flex-col p-2"
			disabled={editorEnabled}
			onClick={() => {
				editors.toggle([editorKey]);
			}}
		>
			{editorEnabled ? (
				<div className="p-2 grid grid-cols-3 gap-2">
					<input
						type="text"
						id={editorKey}
						className="col-span-2 p-1"
						onChange={handleChange('name')}
						onFocus={resizeElement}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								editors.toggle([editorKey]);
							}
						}}
						placeholder="Item name"
						value={freeCarryDisplay.name}
					/>
					<input
						autoFocus
						type="text"
						className="p-1 text-center"
						onChange={handleChange('quantity')}
						onFocus={resizeElement}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								editors.toggle([editorKey]);
							}
						}}
						placeholder="Quantity"
						value={freeCarryDisplay.quantity}
					/>
				</div>
			) : (
				<div className="p-2 flex justify-between items-center">
					<p className="min-h-9 flex items-center justify-center text-xl overflow-auto">
						{freeCarryDisplay.name}
					</p>
					<p className="min-h-9 flex items-center text-cnter text-xl overflow-auto">
						{freeCarryDisplay.quantity}
					</p>
				</div>
			)}
			<label htmlFor={editorKey}>{`Free Carry Slot ${index + 1}`}</label>
		</button>
	);
};
