import { RollDice } from './MenuButtons/RollDice';
import { LoadFile } from './MenuButtons/LoadFile';
import { LoadTemplate } from './MenuButtons/LoadTemplate';
import { SaveFile } from './MenuButtons/SaveFile';

export const MenuContent = ({
	closeMenu,
	openDiceRoller,
	openTemplateLoader,
}: {
	readonly closeMenu: () => void;
	readonly openDiceRoller: () => void;
	readonly openTemplateLoader: () => void;
}) => {
	return (
		<>
			<SaveFile closeMenu={closeMenu} />
			<LoadFile closeMenu={closeMenu} />
			<LoadTemplate
				closeMenu={closeMenu}
				openTemplateLoader={openTemplateLoader}
			/>
			<RollDice closeMenu={closeMenu} openDiceRoller={openDiceRoller} />
		</>
	);
};
