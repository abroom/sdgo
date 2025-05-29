import { useState } from 'react';
import {
	Core,
	DEFAULT_CHARACTER_SHEET,
	Stats,
	type CharacterSheet,
} from '../components/CharacterSheet';
import './CharacterSheetPage.css';

export const CharacterSheetPage = () => {
	const [characterSheet, setCharacterSheet] = useState<CharacterSheet>(
		DEFAULT_CHARACTER_SHEET,
	);

	const sectionProps = { characterSheet, setCharacterSheet };

	return (
		<div className="character-sheet-page">
			<Core {...sectionProps} />
			<Stats {...sectionProps} />
		</div>
	);
};
