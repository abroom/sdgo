import { Core } from '@/components/CrawlerSheetPage/Core/Core';
import { Defenses } from '@/components/CrawlerSheetPage/Defenses/Defenses';
import { Spells } from '@/components/CrawlerSheetPage/Spells/Spells';
import { Stats } from '@/components/CrawlerSheetPage/Stats/Stats';
import { Talents } from '@/components/CrawlerSheetPage/Talents/Talents';
import { Weapons } from '@/components/CrawlerSheetPage/Weapons/Weapons';
import { CrawlerSheetProvider } from '@/contexts/CrawlerSheetContext/CrawlerSheetProvider';

export const CrawlerSheetPage = () => {
	return (
		<div className="h-full w-full p-2 sm:p-6 flex flex-col gap-2 sm:gap-6 overflow-auto">
			<CrawlerSheetProvider>
				<Core />
				<Stats />
				<Defenses />
				<Weapons />
				<Spells />
				<Talents />
				{/* 
				Add other sections like Spells, Talents, Gear as needed
				<Gear />
				*/}
			</CrawlerSheetProvider>
		</div>
	);
};
