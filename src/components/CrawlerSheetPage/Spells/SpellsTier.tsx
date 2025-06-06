import { useState } from 'react';

import { type Editors } from '@/hooks/Editors';
import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { Section } from '../Section';
import { SpellsTierContent } from './SpellsTierContent';

export const SpellsTier = ({
	tiers,
	index,
	editors,
	updateCrawlerSheet,
}: {
	readonly tiers: CrawlerSheet['spells']['tiers'];
	readonly index: number;
	readonly editors: Editors<CrawlerSheet['spells']>;
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	const tier = tiers[index];

	const [isContentVisible, setIsContentVisible] = useState(true);

	return (
		<Section>
			<button
				className="border-none w-full p-4"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h3 className="text-left">{tier.name || `Tier ${index + 1}`}</h3>
			</button>
			{isContentVisible && (
				<SpellsTierContent
					tiers={tiers}
					index={index}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			)}
		</Section>
	);
};
