import { useContext, useState } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { Section } from '../Section';
import { GearContent } from './GearContent';

export const Gear = () => {
	const {
		crawlerSheet: { gear },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const [isContentVisible, setIsContentVisible] = useState(true);
	const editors = useEditors<CrawlerSheet['gear']>();

	console.log('Gear render', { gear, editors });

	return (
		<Section>
			<button
				className="border-none w-full p-4"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Gear</h2>
			</button>
			{isContentVisible && (
				<>
					<GearContent
						gear={gear}
						editors={editors}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				</>
			)}
		</Section>
	);
};
