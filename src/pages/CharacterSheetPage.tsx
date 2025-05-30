import { useState } from 'react';
import {
	Core,
	DEFAULT_CHARACTER_SHEET,
	Stats,
	type CharacterSheet,
} from '../components/CharacterSheet';
import './CharacterSheetPage.css';
import { Defenses } from '../components/CharacterSheet/Defenses/Defenses';

export const CharacterSheetPage = () => {
	const [characterSheet, setCharacterSheet] = useState<CharacterSheet>(
		DEFAULT_CHARACTER_SHEET,
	);

	console.log('CharacterSheetPage', JSON.stringify(characterSheet, null, 10));

	const sectionProps = { characterSheet, setCharacterSheet };

	return (
		<div className="character-sheet-page">
			<Core {...sectionProps} />
			<Stats {...sectionProps} />
			<Defenses {...sectionProps} />
		</div>
	);
};
