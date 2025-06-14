import { useCallback, useContext } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

import { MenuButton } from '../MenuButton';

export const LoadFile = ({ closeMenu }: { readonly closeMenu: () => void }) => {
	const { updateCrawlerSheet } = useContext(CrawlerSheetContext);

	const handleLoad = useCallback(() => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'application/json';
		input.onchange = (event: Event) => {
			const target = event.target as HTMLInputElement;
			if (target.files && target.files.length > 0) {
				const file = target.files[0];
				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const result = e.target?.result as string;
						const loadedData = JSON.parse(result) as CrawlerSheet;
						updateCrawlerSheet(loadedData);
						closeMenu();
					} catch (error) {
						console.error('Error loading JSON file:', error);
					}
				};
				reader.readAsText(file);
			}
		};
		document.body.appendChild(input);
		input.click();
		document.body.removeChild(input);
	}, [closeMenu, updateCrawlerSheet]);

	return <MenuButton onClick={handleLoad}>Load JSON</MenuButton>;
};
