import { useContext, useState } from 'react';

import { CRAWLER_SHEET__BLANK } from '@/constants/CrawlerSheets/Blank';
import { CRAWLER_SHEET__MOCK } from '@/constants/CrawlerSheets/Mock';
import { CRAWLER_SHEET__CYBERDARK } from '@/constants/CrawlerSheets/Cyberdark';
import { CRAWLER_SHEET__SHADOWDARK } from '@/constants/CrawlerSheets/Shadowdark';
import { CRAWLER_SHEET__DARK_SUNS_SHADOW } from '@/constants/CrawlerSheets/DarkSunsShadow';
import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';

const templates = {
	Blank: CRAWLER_SHEET__BLANK,
	'Shadow Dark': CRAWLER_SHEET__SHADOWDARK,
	Cyberdark: CRAWLER_SHEET__CYBERDARK,
	"Dark Sun's Shadow": CRAWLER_SHEET__DARK_SUNS_SHADOW,
	Mock: CRAWLER_SHEET__MOCK,
} as const;

export const LoadTemplate = () => {
	const { updateCrawlerSheet } = useContext(CrawlerSheetContext);

	const [template, setTemplate] = useState<keyof typeof templates>('Blank');

	return (
		<div className="sm:w-75 border border-(--color-primary-3) rounded-md p-2">
			<select
				className="w-full p-2 text-2xl"
				onChange={({ target: { value } }) =>
					setTemplate(value as keyof typeof templates)
				}
				value={template}
			>
				{Object.keys(templates).map((key) => (
					<option key={key} value={key}>
						{key}
					</option>
				))}
			</select>
			<button
				className="mt-2 w-full"
				onClick={() => updateCrawlerSheet(templates[template])}
			>
				<h3>Load Template</h3>
			</button>
		</div>
	);
};
