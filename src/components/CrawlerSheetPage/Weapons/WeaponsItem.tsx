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

export const WeaponsItem = ({
	data,
	index,
	editors,
	updateCrawlerSheet,
}: {
	readonly data: CrawlerSheet['weapons']['data'];
	readonly index: number;
	readonly editors: Editors<CrawlerSheet['weapons']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const { editorKey, editorEnabled } = useMemo(() => {
		const editorKey: `data.${number}` = `data.${index}`;
		const editorEnabled = editors.enabled.has(editorKey);
		return { editorKey, editorEnabled };
	}, [editors.enabled, index]);

	const [weaponDisplay, setWeaponDisplay] = useState(deepCopy(data[index]));
	useEffect(() => {
		setWeaponDisplay(deepCopy(data[index]));
	}, [data, index]);

	const persistTimeoutRefs = useRef<Record<string, number | undefined>>({});

	const handleChange = useCallback(
		(field: keyof CrawlerSheet['weapons']['data'][number]) =>
			({
				target: { value },
			}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setWeaponDisplay((prev) => ({ ...prev, [field]: value }));
				clearTimeout(persistTimeoutRefs.current[field]);
				persistTimeoutRefs.current[field] = window.setTimeout(() => {
					updateCrawlerSheet({
						weapons: {
							data: data.map((w, i) =>
								i === index ? { ...w, [field]: value } : w,
							),
						},
					});
					persistTimeoutRefs.current[field] = undefined;
				}, 200);
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
			<h3 className="text-left">
				{weaponDisplay.name || `Weapon ${index + 1}`}
			</h3>
			<div
				className={clsx(
					'm-2 border-t border-(--color-primary-3) flex-grow p-2',
					'grid grid-cols-2 sm:grid-cols-4 gap-2',
				)}
			>
				{(['type', 'range', 'mod', 'damage'] as const).map((item, i) => (
					<div key={item}>
						<div className="h-full flex flex-col">
							{editorEnabled ? (
								<input
									className="p-1 text-center placeholder:capitalize "
									type="text"
									value={weaponDisplay[item] || ''}
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
									<span className="overflow-auto">{weaponDisplay[item]}</span>
								</h4>
							)}
							<label className="capitalize">{item}</label>
						</div>
					</div>
				))}
			</div>
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
						value={weaponDisplay.notes}
					/>
				</div>
			) : (
				!!weaponDisplay.notes && (
					<div className="p-2 pt-0">
						<p className="rounded-md p-2 bg-(--color-primary-2) text-left whitespace-pre-wrap">
							{weaponDisplay.notes}
						</p>
					</div>
				)
			)}
		</button>
	);
};
