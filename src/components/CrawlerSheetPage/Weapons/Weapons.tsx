import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';
import { useContext, useState } from 'react';
import { Section } from '../Section';
import { WeaponsContent } from './WeaponsContent';

export const Weapons = () => {
	const {
		crawlerSheet: { weapons },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const [isContentVisible, setIsContentVisible] = useState(
		weapons.data.length > 0 || weapons.notes.length > 0,
	);
	const editors = useEditors<CrawlerSheet['weapons']>();

	console.log('Weapons render', { weapons, editors });

	return (
		<Section>
			<button
				className="border-none w-full p-4"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Weapons</h2>
			</button>
			{isContentVisible && (
				<WeaponsContent
					weapons={weapons}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			)}
		</Section>
	);
};
