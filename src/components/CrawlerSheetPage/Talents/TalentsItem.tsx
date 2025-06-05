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

export const TalentsItem = ({
	data,
	index,
	editors,
	updateCrawlerSheet,
}: {
	readonly data: CrawlerSheet['talents']['data'];
	readonly index: number;
	readonly editors: Editors<CrawlerSheet['talents']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const { editorKey, editorEnabled } = useMemo(() => {
		const editorKey: `data.${number}` = `data.${index}`;
		const editorEnabled = editors.enabled.has(editorKey);
		return { editorKey, editorEnabled };
	}, [editors.enabled, index]);

	const [talentDisplay, setTalentDisplay] = useState(deepCopy(data[index]));
	useEffect(() => {
		setTalentDisplay(deepCopy(data[index]));
	}, [data, index]);

	const persistTimeoutRefs = useRef<Record<string, number | undefined>>({});

	const handleChange = useCallback(
		(field: keyof CrawlerSheet['talents']['data'][number]) =>
			({
				target: { value },
			}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setTalentDisplay((prev) => ({ ...prev, [field]: value }));
				clearTimeout(persistTimeoutRefs.current[field]);
				persistTimeoutRefs.current[field] = window.setTimeout(() => {
					updateCrawlerSheet({
						talents: {
							data: data.map((talent, i) =>
								i === index ? { ...talent, [field]: value } : talent,
							),
						},
					});
					persistTimeoutRefs.current[field] = undefined;
				}, 500);
			},
		[data, index, updateCrawlerSheet],
	);

	return (
		<button
			className="p-2 flex flex-col"
			disabled={editorEnabled}
			onClick={() => {
				editors.toggle([editorKey]);
			}}
		>
			<h3 className="mb-2 text-left">
				{talentDisplay.label || `Talent ${index + 1}`}
			</h3>
			{editorEnabled ? (
				<div className="p-2 pt-0">
					<textarea
						className="p-2"
						onChange={handleChange('value')}
						onFocus={resizeElement}
						onKeyDown={(e) => {
							if (isKeyExit(e, true)) {
								editors.toggle([editorKey]);
							} else {
								resizeElement(e);
							}
						}}
						placeholder="Talent Details"
						value={talentDisplay.value}
					/>
				</div>
			) : (
				!!talentDisplay.value && (
					<div className="p-2 pt-0">
						<p className="rounded-md p-2 bg-(--color-primary-2) text-left whitespace-pre-wrap">
							{talentDisplay.value}
						</p>
					</div>
				)
			)}
		</button>
	);
};
