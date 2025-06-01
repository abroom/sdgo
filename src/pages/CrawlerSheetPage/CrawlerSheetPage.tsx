import './CrawlerSheetPage.css';

import {
	Core,
	// Defenses,
	// Spells,
	// Stats,
	// Weapons,
} from '@/components/CrawlerSheetPage/Core/Core';
import { CrawlerSheetProvider } from '@/contexts/CrawlerSheetContext/CrawlerSheetProvider';

export const CrawlerSheetPage = () => {
	return (
		<div className="crawler-sheet-page">
			<CrawlerSheetProvider>
				<Core />
				{/* <Stats />
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
