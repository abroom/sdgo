import { useCallback, useContext, useState } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { Section } from '../Section';
import { CoreContent } from './CoreContent';
import { CoreTitle } from './CoreTitle';

export const Core = () => {
	const {
		crawlerSheet: { core },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const [isContentVisible, setIsContentVisible] = useState(true);

	const toggleContent = useCallback(() => {
		setIsContentVisible((prev) => !prev);
	}, []);

	const editors = useEditors<CrawlerSheet['core']>();

	return (
		<Section>
			<CoreTitle
				coreName={core.name}
				editors={editors}
				toggleContent={toggleContent}
				updateCrawlerSheet={updateCrawlerSheet}
			/>
			{isContentVisible && (
				<CoreContent
					core={core}
					editors={editors}
					updateCrawlerSheet={updateCrawlerSheet}
				/>
			)}
		</Section>
	);
};
