import { Dice } from './MenuButtons/Dice';
import { LoadFile } from './MenuButtons/LoadFile';
import { LoadTemplate } from './MenuButtons/LoadTemplate';
import { SaveFile } from './MenuButtons/SaveFile';

export const MenuContent = ({
	closeMenu,
}: {
	readonly closeMenu: () => void;
}) => {
	return (
		<>
			<SaveFile closeMenu={closeMenu} />
			<LoadFile closeMenu={closeMenu} />
			<LoadTemplate closeMenu={closeMenu} />
			<Dice closeMenu={closeMenu} />
		</>
	);
};
