import { useContext, useState } from 'react';

import clsx from 'clsx';

import { CRAWLER_SHEET__BLANK } from '@/constants/CrawlerSheets/Blank';
import { CRAWLER_SHEET__EXAMPLE } from '@/constants/CrawlerSheets/Example';
import { CRAWLER_SHEET__CYBERDARK } from '@/constants/CrawlerSheets/Cyberdark';
import { CRAWLER_SHEET__SHADOWDARK } from '@/constants/CrawlerSheets/Shadowdark';
import { CRAWLER_SHEET__DARK_SUNS_SHADOW } from '@/constants/CrawlerSheets/DarkSunsShadow';
import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { Dialog } from '@/components/Dialog/Dialog';

import { MenuButton } from '../MenuButton';

const templates = {
	'Shadow Dark': CRAWLER_SHEET__SHADOWDARK,
	Cyberdark: CRAWLER_SHEET__CYBERDARK,
	"Dark Sun's Shadow": CRAWLER_SHEET__DARK_SUNS_SHADOW,
	Blank: CRAWLER_SHEET__BLANK,
	Example: CRAWLER_SHEET__EXAMPLE,
} as const;

export const LoadTemplate = ({
	closeMenu,
}: {
	readonly closeMenu: () => void;
}) => {
	const { updateCrawlerSheet } = useContext(CrawlerSheetContext);

	const [showTemplate, setShowTemplate] = useState(false);
	const [template, setTemplate] = useState<keyof typeof templates>();

	return (
		<>
			<MenuButton onClick={() => setShowTemplate(true)}>
				Load Template
			</MenuButton>

			{showTemplate && (
				<Dialog>
					<div className="flex-grow flex flex-col gap-4">
						<div className="flex-grow">
							<label htmlFor="template-select">Select template</label>
							<select
								id="template-select"
								className={clsx(
									'w-full p-2 text-2xl',
									!template && 'text-(--color-primary-4)',
								)}
								onChange={({ target: { value } }) =>
									setTemplate(value as keyof typeof templates)
								}
								value={template || ''}
							>
								<option disabled value="">
									-- Select a template --
								</option>
								{Object.keys(templates).map((key) => (
									<option key={key} value={key}>
										{key}
									</option>
								))}
							</select>
						</div>
						<div className="flex gap-2">
							<button
								className="flex-grow"
								onClick={() => setShowTemplate(false)}
							>
								Close
							</button>
							<button
								className="flex-grow"
								disabled={!template}
								onClick={() => {
									if (!template) return;
									updateCrawlerSheet(templates[template]);
									setShowTemplate(false);
									closeMenu();
								}}
							>
								Load
							</button>
						</div>
					</div>
				</Dialog>
			)}
		</>
	);
};
