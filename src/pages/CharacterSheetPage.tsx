import { useState } from 'react';
import {
	type CharacterSheet,
	Core,
	DEFAULT_CHARACTER_SHEET,
	Defenses,
	Stats,
	Weapons,
} from '../components/CharacterSheet';
import './CharacterSheetPage.css';

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
			<Weapons {...sectionProps} />
			{/* Add other sections like Spells, Talents, Gear as needed */}
			{/* <Spells {...sectionProps} /> */}
			{/* <Talents {...sectionProps} /> */}
			{/* <Gear {...sectionProps} /> */}
		</div>
	);
};
