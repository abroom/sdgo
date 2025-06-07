import { Core } from '@/components/CrawlerSheetPage/Core/Core';
import { Defenses } from '@/components/CrawlerSheetPage/Defenses/Defenses';
import { Gear } from '@/components/CrawlerSheetPage/Gear/Gear';
import { Menu } from '@/components/CrawlerSheetPage/Menu/Menu';
import { Spells } from '@/components/CrawlerSheetPage/Spells/Spells';
import { Stats } from '@/components/CrawlerSheetPage/Stats/Stats';
import { Talents } from '@/components/CrawlerSheetPage/Talents/Talents';
import { Weapons } from '@/components/CrawlerSheetPage/Weapons/Weapons';
import { CrawlerSheetProvider } from '@/contexts/CrawlerSheetContext/CrawlerSheetProvider';

export const CrawlerSheetPage = () => {
	return (
		<CrawlerSheetProvider>
			<Menu />
			<div className="h-[100%-(var(--spacing)*10)] w-full p-2 sm:p-6 flex flex-col gap-2 sm:gap-6 overflow-auto">
				<Core />
				<Talents />
				<Stats />
				<Defenses />
				<Weapons />
				<Spells />
				<Gear />
			</div>
		</CrawlerSheetProvider>
	);
};
