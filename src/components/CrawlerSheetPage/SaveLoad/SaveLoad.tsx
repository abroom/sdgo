import { useState } from 'react';

import { Section } from '../Section';
import { SaveLoadContent } from './SaveLoadContent';

export const SaveLoad = () => {
	const [isContentVisible, setIsContentVisible] = useState(false);

	return (
		<Section>
			<button
				className="border-none w-full p-4"
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Save &amp; Load</h2>
			</button>
			{isContentVisible && <SaveLoadContent />}
		</Section>
	);
};
