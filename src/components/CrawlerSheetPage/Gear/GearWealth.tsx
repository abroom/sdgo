import { useState } from 'react';

import type { Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { GearWealthEditor } from './GearWealthEditor';
import { GearWealthItem } from './GearWealthItem';

export const GearWealth = ({
	wealth,
	editors,
	updateCrawlerSheet,
}: {
	readonly wealth: CrawlerSheet['gear']['wealth'];
	readonly editors: Editors<CrawlerSheet['gear']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const [isContentVisible, setIsContentVisible] = useState(true);

	return (
		<div className="border border-(--color-primary-3) rounded-md p-2 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
			<button
				className="border-none col-span-full p-2"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h3>Wealth</h3>
			</button>
			{isContentVisible &&
				(editors.enabled.has('wealth') ? (
					<GearWealthEditor
						wealth={wealth}
						editors={editors}
						updateCrawlerSheet={updateCrawlerSheet}
					/>
				) : (
					wealth.map((_, index) => (
						<GearWealthItem
							key={index}
							wealth={wealth}
							index={index}
							editors={editors}
							updateCrawlerSheet={updateCrawlerSheet}
						/>
					))
				))}
		</div>
	);
};
