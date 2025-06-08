import { MenuButton } from '../MenuButton';

export const LoadTemplate = ({
	closeMenu,
	openTemplateLoader,
}: {
	readonly closeMenu: () => void;
	readonly openTemplateLoader: () => void;
}) => {
	return (
		<MenuButton
			onClick={() => {
				closeMenu();
				openTemplateLoader();
			}}
		>
			Load Template
		</MenuButton>
	);
};
