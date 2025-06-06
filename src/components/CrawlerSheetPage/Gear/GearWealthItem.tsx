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

export const GearWealthItem = ({
	wealth,
	index,
	editors,
	updateCrawlerSheet,
}: {
	readonly wealth: CrawlerSheet['gear']['wealth'];
	readonly index: number;
	readonly editors: Editors<CrawlerSheet['gear']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const { editorKey, editorEnabled } = useMemo(() => {
		const editorKey: `wealth.${number}` = `wealth.${index}`;
		const editorEnabled = editors.enabled.has(editorKey);
		return { editorKey, editorEnabled };
	}, [editors.enabled, index]);

	const [wealthDisplay, setWealthDisplay] = useState(deepCopy(wealth[index]));
	useEffect(() => {
		setWealthDisplay(deepCopy(wealth[index]));
	}, [wealth, index]);

	const persistTimeoutRefs = useRef<Record<string, number | undefined>>({});

	const handleChange = useCallback(
		(field: keyof CrawlerSheet['gear']['wealth'][number]) =>
			({
				target: { value },
			}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setWealthDisplay((prev) => ({ ...prev, [field]: value }));
				clearTimeout(persistTimeoutRefs.current[field]);
				persistTimeoutRefs.current[field] = window.setTimeout(() => {
					updateCrawlerSheet({
						gear: {
							wealth: wealth.map((w, i) =>
								i === index ? { ...w, [field]: value } : w,
							),
						},
					});
					persistTimeoutRefs.current[field] = undefined;
				}, 500);
			},
		[wealth, index, updateCrawlerSheet],
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
				<div className="p-2">
					<input
						autoFocus
						type="text"
						id={editorKey}
						className="p-1 text-center"
						onChange={handleChange('quantity')}
						onFocus={resizeElement}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								editors.toggle([editorKey]);
							}
						}}
						placeholder="Quantity"
						value={wealthDisplay.quantity}
					/>
				</div>
			) : (
				<div className="p-2">
					<p className="min-h-9 text-2xl">{wealthDisplay.quantity}</p>
				</div>
			)}
			<label htmlFor={editorKey}>
				{wealthDisplay.type || `Wealth Type ${index + 1}`}
			</label>
		</button>
	);
};
