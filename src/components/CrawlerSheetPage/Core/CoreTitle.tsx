import {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ChangeEvent,
} from 'react';

import classNames from 'classnames';

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

	const isNameEditorEnabled = useMemo(
		() => editors.enabled.has('name'),
		[editors],
	);

	const persistTimoutRef = useRef<number>(null);
	const handleChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setName(value);

			if (persistTimoutRef.current) {
				clearTimeout(persistTimoutRef.current);
			}

			persistTimoutRef.current = setTimeout(() => {
				updateCrawlerSheet({ core: { name: value } });
				persistTimoutRef.current = null;
			}, 500);
		},
		[updateCrawlerSheet],
	);

	const nameInputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (isNameEditorEnabled && nameInputRef.current) {
			nameInputRef.current.focus();
		}
	}, [isNameEditorEnabled, nameInputRef]);

	return (
		<button
			className={classNames('title', 'p-4', 'text-5xl')}
			disabled={isNameEditorEnabled}
			onClick={toggleContent}
		>
			{isNameEditorEnabled ? (
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
				<h1 className="h-15 flex items-center justify-center">
					{name || namePlaceholder}
				</h1>
			)}
		</button>
	);
});
