import { useCallback, useContext } from 'react';

import { CrawlerSheetContext } from '@/contexts/CrawlerSheetContext/CrawlerSheetContext';

import { MenuButton } from '../MenuButton';

export const SaveFile = ({ closeMenu }: { readonly closeMenu: () => void }) => {
	const { crawlerSheet } = useContext(CrawlerSheetContext);

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
		closeMenu();
	}, [closeMenu, crawlerSheet]);

	return <MenuButton onClick={handleSave}>Save JSON</MenuButton>;
};
