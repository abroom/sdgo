import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';
import { isKeyExit } from '@/utils/IsKeyExit';
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ChangeEvent,
} from 'react';

export const StatsRow = ({
	data,
	index,
	editors,
	updateCrawlerSheet,
}: {
	readonly data: CrawlerSheet['stats']['data'];
	readonly index: number;
	readonly editors: Editors<CrawlerSheet['stats']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	console.log('StatsRow render', { index });

	const stat = data[index];

	const { editorKey, editing } = useMemo(() => {
		const editorKey: `data.${number}` = `data.${index}`;
		const editing = editors.enabled.has(editorKey);
		return { editorKey, editing };
	}, [editors.enabled, index]);

	const [score, setScore] = useState(stat.score);
	const [mod, setMod] = useState(stat.mod);
	useEffect(() => {
		setScore(stat.score);
		setMod(stat.mod);
	}, [stat]);

	const persistScoreTimeoutRef = useRef<number>(undefined);
	const handleScoreChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setScore(value);
			clearTimeout(persistScoreTimeoutRef.current);
			persistScoreTimeoutRef.current = setTimeout(() => {
				updateCrawlerSheet({
					stats: {
						data: data.map((stat, i) =>
							i === index ? { ...stat, score: value } : stat,
						),
					},
				});
				persistScoreTimeoutRef.current = undefined;
			}, 500);
		},
		[data, index, updateCrawlerSheet],
	);

	const persistModTimeoutRef = useRef<number>(undefined);
	const handleModChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setMod(value);
			clearTimeout(persistModTimeoutRef.current);
			persistModTimeoutRef.current = setTimeout(() => {
				updateCrawlerSheet({
					stats: {
						data: data.map((stat, i) =>
							i === index ? { ...stat, mod: value } : stat,
						),
					},
				});
				persistModTimeoutRef.current = undefined;
			}, 500);
		},
		[data, index, updateCrawlerSheet],
	);

	return (
		<button
			className="p-2 grid grid-cols-3 gap-2 text-center"
			disabled={editing}
			onClick={() => {
				editors.toggle([editorKey]);
			}}
		>
			<span className="flex flex-col items-center justify-center">
				<h3 className="uppercase">{stat.name.substring(0, 3)}</h3>
				<label>{stat.name}</label>
			</span>
			{editing ? (
				<>
					<input
						autoFocus
						className="text-xl text-center"
						onChange={handleScoreChange}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								editors.toggle([editorKey]);
							}
						}}
						placeholder="Score"
						type="text"
						value={score}
					/>
					<input
						className="text-xl text-center"
						onChange={handleModChange}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								editors.toggle([editorKey]);
							}
						}}
						placeholder="Mod"
						type="text"
						value={mod}
					/>
				</>
			) : (
				<>
					<div className="flex flex-col items-center justify-center">
						<h3>{score}</h3>
						<label>Score</label>
					</div>
					<div className="flex flex-col items-center justify-center">
						<h3>{mod}</h3>
						<label>Mod</label>
					</div>
				</>
			)}
		</button>
	);
};
