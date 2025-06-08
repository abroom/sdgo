import { useState } from 'react';

import { DiceRoller } from '@/components/CrawlerSheetPage/DiceRoller/DiceRoller';

import { MenuButton } from '../MenuButton';

export const Dice = ({ closeMenu }: { readonly closeMenu: () => void }) => {
	const [isDiceRollerOpen, setIsDiceRollerOpen] = useState(false);

	return (
		<>
			<MenuButton onClick={() => setIsDiceRollerOpen(true)}>Dice</MenuButton>
			{isDiceRollerOpen && (
				<DiceRoller
					close={() => {
						setIsDiceRollerOpen(false);
						closeMenu();
					}}
				/>
			)}
		</>
	);
};
