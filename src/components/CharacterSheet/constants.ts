// import type { CharacterSheet } from './types';

// export const DEFAULT_CHARACTER_SHEET: CharacterSheet = {
// 	core: {
// 		name: '',
// 		player: '',
// 		class: '',
// 		ancestry: '',
// 		background: '',
// 		title: '',
// 		alignment: '',
// 		backstory: '',
// 		deity: '',
// 		lvl: '1',
// 		xp: { current: '0', required: '10' },
// 		notes: '',
// 	},
// 	stats: {
// 		data: [
// 			{ name: 'Strength', score: '1231', mod: '12313' },
// 			{ name: 'Dexterity', score: '12', mod: '+1' },
// 			{ name: 'Constitution', score: '', mod: '-5' },
// 			{ name: 'Intelligence', score: '', mod: '' },
// 			{ name: 'Wisdom', score: '', mod: '' },
// 			{ name: 'Charisma', score: '', mod: '' },
// 		],
// 		notes: '',
// 	},
// 	defenses: {
// 		ac: '',
// 		hp: { current: '', max: '' },
// 		notes: '',
// 	},
// 	weapons: {
// 		data: [],
// 		notes: '',
// 	},
// 	spells: {
// 		mod: '',
// 		data: [],
// 		notes: '',
// 	},
// 	talents: {
// 		data: [
// 			{
// 				label: 'Languages',
// 				value: 'Common',
// 			},
// 		],
// 		notes: '',
// 	},
// 	gear: {
// 		wealth: [],
// 		maxSlots: '10',
// 		items: [],
// 		freeCarry: '',
// 		notes: '',
// 	},
// } as const;

import type { CharacterSheet } from './types';

export const DEFAULT_CHARACTER_SHEET: CharacterSheet = {
	core: {
		name: '',
		player: '',
		class: '',
		ancestry: '',
		background: '',
		title: '',
		alignment: '',
		backstory: '',
		deity: '',
		lvl: '1',
		xp: { current: '0', required: '10' },
		notes: '',
	},
	stats: {
		data: [
			{ name: 'Strength', score: '1231', mod: '12313' },
			{ name: 'Dexterity', score: '12', mod: '+1' },
			{ name: 'Constitution', score: '', mod: '-5' },
			{ name: 'Intelligence', score: '', mod: '' },
			{ name: 'Wisdom', score: '', mod: '' },
			{ name: 'Charisma', score: '', mod: '' },
		],
		notes: '',
	},
	defenses: {
		ac: '',
		hp: { current: '', max: '' },
		notes: '',
	},
	weapons: {
		data: [
			{
				name: 'Longsword',
				type: 'Melee',
				range: '5 ft.',
				mod: '+2',
				damage: '1d8+1 slashing',
				notes: '',
			},
			{
				name: 'Shortbow',
				type: 'Ranged',
				range: '80/320 ft.',
				mod: '+3',
				damage: '1d6 piercing',
				notes: 'a note',
			},
		],
		notes: '',
	},
	spells: {
		mod: '',
		data: [],
		notes: '',
	},
	talents: {
		data: [
			{
				label: 'Languages',
				value: 'Common',
			},
		],
		notes: '',
	},
	gear: {
		wealth: [],
		maxSlots: '10',
		items: [],
		freeCarry: '',
		notes: '',
	},
} as const;
