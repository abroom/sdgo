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
	attacks: {
		data: [],
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
