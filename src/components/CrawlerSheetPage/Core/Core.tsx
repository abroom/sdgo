import { useCallback, useState } from 'react';

import { Editors } from '@/components/Editors/Editors';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { CoreContent } from './CoreContent';
import { CoreTitle } from './CoreTitle';

import './Core.css';

export const Core = () => {
	const [isContentVisible, setIsContentVisible] = useState(true);

	const toggleContent = useCallback(() => {
		setIsContentVisible((prev) => !prev);
	}, []);

	return (
		<section className="core">
			<Editors<CrawlerSheet['core']>>
				{(editorsControls) => (
					<>
						<CoreTitle
							editorsControls={editorsControls}
							toggleContent={toggleContent}
						/>
						{isContentVisible && (
							<CoreContent editorsControls={editorsControls} />
						)}
					</>
				)}
			</Editors>
		</section>
	);
};
