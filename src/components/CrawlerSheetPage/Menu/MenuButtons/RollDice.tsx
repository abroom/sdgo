import { MenuButton } from '../MenuButton';

export const RollDice = ({
	closeMenu,
	openDiceRoller,
}: {
	readonly closeMenu: () => void;
	readonly openDiceRoller: () => void;
}) => {
	return (
		<>
			<MenuButton
				onClick={() => {
					closeMenu();
					openDiceRoller();
				}}
			>
				Roll Dice
			</MenuButton>
		</>
	);
};
