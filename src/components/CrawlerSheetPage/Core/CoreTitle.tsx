import {
	type ChangeEvent,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';
import { isKeyExit } from '@/utils/IsKeyExit';

const namePlaceholder = 'Unnamed Crawler';

export const CoreTitle = memo(function CoreTitle({
	coreName,
	editors,
	toggleContent,
	updateCrawlerSheet,
}: {
	readonly coreName: CrawlerSheet['core']['name'];
	readonly editors: Editors<CrawlerSheet['core']>;
	readonly toggleContent: () => void;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) {
	const [name, setName] = useState(coreName);
	useEffect(() => {
		setName(coreName);
	}, [coreName]);

	const editorEnabled = useMemo(() => editors.enabled.has('name'), [editors]);

	const persistTimeoutRef = useRef<number>(undefined);
	const handleChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setName(value);
			clearTimeout(persistTimeoutRef.current);
			persistTimeoutRef.current = setTimeout(() => {
				updateCrawlerSheet({ core: { name: value } });
				persistTimeoutRef.current = undefined;
			}, 500);
		},
		[updateCrawlerSheet],
	);

	const nameInputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (editorEnabled && nameInputRef.current) {
			nameInputRef.current.focus();
		}
	}, [editorEnabled, nameInputRef]);

	return (
		<button
			className="border-none w-full p-4 text-5xl"
			disabled={editorEnabled}
			onClick={toggleContent}
		>
			{editorEnabled ? (
				<input
					className="h-15 text-center"
					type="text"
					value={name}
					placeholder={namePlaceholder}
					ref={nameInputRef}
					onChange={handleChange}
					onKeyDown={(e) => {
						if (isKeyExit(e)) {
							editors.toggle(['name']);
						}
					}}
				/>
			) : (
				<div className="h-15 min-h-fit flex items-center overflow-auto">
					<h1 className="flex-grow">{name || namePlaceholder}</h1>
				</div>
			)}
		</button>
	);
});
