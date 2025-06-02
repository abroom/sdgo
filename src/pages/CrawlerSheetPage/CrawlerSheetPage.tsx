import { Core } from '@/components/CrawlerSheetPage/Core/Core';
import { Stats } from '@/components/CrawlerSheetPage/Stats/Stats';
import { CrawlerSheetProvider } from '@/contexts/CrawlerSheetContext/CrawlerSheetProvider';

import './CrawlerSheetPage.css';

export const CrawlerSheetPage = () => {
	return (
		<div className="crawler-sheet-page">
			<CrawlerSheetProvider>
				<Core />
				<Stats />
				{/* 
				<Defenses />
				<Weapons />
				<Spells /> */}
				{/* Add other sections like Spells, Talents, Gear as needed */}
				{/* <Talents /> */}
				{/* <Gear /> */}
			</CrawlerSheetProvider>
		</div>
	);
};
