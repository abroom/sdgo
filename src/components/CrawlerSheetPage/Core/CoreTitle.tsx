import { useContext, useEffect, useMemo, useRef } from 'react';

import classNames from 'classnames';

import type { EditorsControls } from '@/components/Editors/Editors';
import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import type { CrawlerSheet } from '@/types/CrawlerSheet';
import { isKeyExit } from '@/utils/IsKeyExit';

const namePlaceholder = 'Unnamed Crawler';

export const CoreTitle = ({
	editorsControls: { editors, toggleEditors },
	toggleContent,
}: {
	readonly editorsControls: EditorsControls<CrawlerSheet['core']>;
	readonly toggleContent: () => void;
}) => {
	const {
		crawlerSheet: {
			core: { name },
		},
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const isNameEditorEnabled = useMemo(() => editors.has('name'), [editors]);

	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (isNameEditorEnabled && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isNameEditorEnabled, inputRef]);

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
					ref={inputRef}
					onChange={({ target: { value } }) =>
						updateCrawlerSheet({ core: { name: value } })
					}
					onKeyDown={(e) => {
						if (isKeyExit(e)) {
							toggleEditors(['name']);
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
};
