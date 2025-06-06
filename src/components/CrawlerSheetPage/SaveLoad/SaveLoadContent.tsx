import { useCallback, useContext } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';
import type { CrawlerSheet } from '@/types/CrawlerSheet';

export const SaveLoadContent = () => {
	const { crawlerSheet, updateCrawlerSheet } = useContext(CrawlerSheetContext);

	const handleSave = useCallback(() => {
		const data = JSON.stringify(crawlerSheet, null, 2);
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;

		const now = new Date();
		a.download = `${crawlerSheet.core.name.replace(/\s+/g, '_') || 'crawler_sheet'}_${now.toISOString()}.json`;

		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [crawlerSheet]);

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
	}, [updateCrawlerSheet]);

	return (
		<div className="p-4 flex flex-col sm:flex-row gap-4 justify-center">
			<button onClick={handleSave}>
				<h3>Save as .json</h3>
			</button>
			<button onClick={handleLoad}>
				<h3>Load .json</h3>
			</button>
		</div>
	);
};
