import type { Dispatch, SetStateAction } from 'react';

export interface CharacterSheet {
	core: {
		name: string;
		player: string;
		class: string;
		ancestry: string;
		background: string;
		title: string;
		alignment: string;
		backstory: string;
		deity: string;
		lvl: string;
		xp: { current: string; required: string };
		notes: string;
	};
	stats: {
		data: { name: string; score: string; mod: string }[];
		notes: string;
	};
	defenses: {
		ac: string;
		hp: { current: string; max: string };
		notes: string;
	};
	weapons: {
		data: {
			name: string;
			type: string;
			range: string;
			mod: string;
			damage: string;
			notes: string;
		}[];
		notes: string;
	};
	spells: {
		data: {
			tier: string;
			spells: {
				name: string;
				forgotten: boolean;
				range: string;
				duration: string;
				mod: string;
				dc: string;
				effect: string;
				notes: string;
			}[];
			notes: string;
		}[];
		notes: string;
	};
	talents: {
		data: { label: string; value: string }[];
		notes: string;
	};
	gear: {
		wealth: { type: string; amount: string }[];
		maxSlots: string;
		items: { slot: string; name: string; count: string; capacity: string }[];
		freeCarry: string;
		notes: string;
	};
}

export interface CharacterSheetSectionProps {
	characterSheet: CharacterSheet;
	setCharacterSheet: Dispatch<SetStateAction<CharacterSheet>>;
}
