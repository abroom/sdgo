import { useContext, useState } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { Section } from '../Section';
import { DefensesContent } from './DefensesContent';

export const Defenses = () => {
	const [isContentVisible, setIsContentVisible] = useState(true);

	const {
		crawlerSheet: { defenses },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const editors = useEditors<CrawlerSheet['defenses']>();

	console.log('Defenses render', { defenses, editors });

	return (
		<Section>
			<button
				className="border-none w-full p-4 text-5xl"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Defenses</h2>
			</button>
			{isContentVisible && (
				<DefensesContent
					defenses={defenses}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			)}
		</Section>
	);
};
