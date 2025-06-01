import { useContext } from 'react';

import type { EditorsControls } from '@/components/Editors/Editors';
import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import type { CrawlerSheet } from '@/types/CrawlerSheet';
import { isKeyExit } from '@/utils/IsKeyExit';

export const CoreExperienceItem = ({
	editorsControls: { editors, toggleEditors },
}: {
	readonly editorsControls: EditorsControls<CrawlerSheet['core']>;
}) => {
	const {
		crawlerSheet: {
			core: { xp },
		},
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	if (
		!xp.current &&
		!xp.required &&
		!editors.has('xp.current') &&
		!editors.has('xp.required')
	) {
		return null;
	}

	return (
		<div className="core-item">
			<div className="flex gap-[0.5rem]">
				{editors.has('xp.current') ? (
					<input
						autoFocus
						className="flex-grow px-2 h-8 max-w-[calc((100%-1.5rem)/2)] text-right"
						onChange={({ target: { value } }) =>
							updateCrawlerSheet({ core: { xp: { current: value } } })
						}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								toggleEditors(['xp.current']);
							}
						}}
						type="text"
						value={xp.current}
					/>
				) : (
					<button
						className="flex-grow max-w-[calc((100%-1.5rem)/2)]"
						onClick={() => toggleEditors(['xp.current'])}
					>
						<p className="px-2 h-8 min-h-fit justify-end overflow-auto">
							{xp.current}
						</p>
					</button>
				)}
				<p className="px-0 w-[0.5rem] text-center">/</p>
				{editors.has('xp.required') ? (
					<input
						autoFocus
						className="flex-grow px-2 h-8 max-w-[calc((100%-1.5rem)/2)] text-left"
						onChange={({ target: { value } }) =>
							updateCrawlerSheet({ core: { xp: { required: value } } })
						}
						onKeyDown={(e) => {
							if (isKeyExit(e)) {
								toggleEditors(['xp.required']);
							}
						}}
						type="text"
						value={xp.required}
					/>
				) : (
					<button
						className="flex-grow max-w-[calc((100%-1.5rem)/2)]"
						onClick={() => toggleEditors(['xp.required'])}
					>
						<p className="px-2 h-8 min-h-fit justify-start overflow-auto">
							{xp.required}
						</p>
					</button>
				)}
			</div>
			<p>Experience</p>
		</div>
	);
};
