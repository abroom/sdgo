import { useCallback, useContext, useState } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import { useEditors } from '@/hooks/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { CoreContent } from './CoreContent';
import { CoreTitle } from './CoreTitle';

import './Core.css';

export const Core = () => {
	const [isContentVisible, setIsContentVisible] = useState(true);

	const toggleContent = useCallback(() => {
		setIsContentVisible((prev) => !prev);
	}, []);

	const {
		crawlerSheet: { core },
		updateCrawlerSheet,
	} = useContext(CrawlerSheetContext);

	const editors = useEditors<CrawlerSheet['core']>();

	console.log('Core render', { core, editors });

	return (
		<section className="core">
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
		</section>
	);
};
