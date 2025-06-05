import { useContext, useState } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { Section } from '../Section';
import { TalentsContent } from './TalentsContent';

export const Talents = () => {
	const {
		crawlerSheet: { talents },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const [isContentVisible, setIsContentVisible] = useState(
		talents.data.length > 0 || talents.notes.length > 0,
	);
	const editors = useEditors<CrawlerSheet['talents']>();

	console.log('Talents render', { talents, editors });

	return (
		<Section>
			<button
				className="border-none w-full p-4"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Talents</h2>
			</button>
			{isContentVisible && (
				<TalentsContent
					talents={talents}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			)}
		</Section>
	);
};
