import { useContext, useState } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { Section } from '../Section';
import { DefensesContent } from './DefensesContent';

export const Defenses = () => {
	const {
		crawlerSheet: { defenses },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const [isContentVisible, setIsContentVisible] = useState(true);

	const editors = useEditors<CrawlerSheet['defenses']>();

	return (
		<Section>
			<button
				className="border-none w-full p-4"
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
