import { useContext, useState } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { Section } from '../Section';
import { SpellsContent } from './SpellsContent';

export const Spells = () => {
	const {
		crawlerSheet: { spells },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	console.log('Spells context', { spells });

	const [isContentVisible, setIsContentVisible] = useState(
		spells.tiers.length > 0 || spells.notes.length > 0,
	);
	const editors = useEditors<CrawlerSheet['spells']>();

	console.log('Spells render', { spells, editors });

	return (
		<Section>
			<button
				className="border-none w-full p-4"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Spells</h2>
			</button>
			{isContentVisible && (
				<SpellsContent
					spells={spells}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			)}
		</Section>
	);
};
