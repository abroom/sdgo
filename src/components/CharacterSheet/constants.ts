import type { CharacterSheet } from './types';

export const DEFAULT_CHARACTER_SHEET: CharacterSheet = {
	core: {
		name: 'Aragorn',
		player: 'John Doe',
		class: 'Ranger',
		ancestry: 'Human',
		background: 'Noble',
		title: 'King of Gondor',
		alignment: 'Lawful Good',
		deity: 'Eru Ilúvatar',
		lvl: '5',
		xp: { current: '1200', required: '1500' },
		notes: 'Leader of the Fellowship of the Ring.',
	},
	stats: {
		data: [
			{ name: 'Strength', score: '16', mod: '+3' },
			{ name: 'Dexterity', score: '14', mod: '+2' },
			{ name: 'Constitution', score: '15', mod: '+2' },
			{ name: 'Intelligence', score: '12', mod: '+1' },
			{ name: 'Wisdom', score: '13', mod: '+1' },
			{ name: 'Charisma', score: '18', mod: '+4' },
		],
		notes: 'Well-rounded stats for a ranger.',
	},
	defenses: {
		ac: '16',
		hp: { current: '45', max: '45' },
		notes: 'Wears leather armor and carries a shield.',
	},
	weapons: {
		data: [
			{
				name: 'Longsword',
				type: 'Melee',
				range: '5 ft.',
				mod: '+5',
				damage: '1d8+3 slashing',
				notes: 'A finely crafted blade.',
			},
			{
				name: 'Bow of the West',
				type: 'Ranged',
				range: '150/600 ft.',
				mod: '+4',
				damage: '1d8 piercing',
				notes: 'Gifted by the elves.',
			},
		],
		notes: 'Carries weapons suitable for both melee and ranged combat.',
	},
	spells: {
		data: [
			{
				tier: '1',
				spells: [
					{
						name: "Hunter's Mark",
						forgotten: false,
						range: '90 ft.',
						duration: 'Focus',
						mod: '+1',
						effect: 'Marks a target to deal extra damage.',
						dc: '11',
						notes: 'some notes',
					},
					{
						name: 'Cure Wounds',
						forgotten: true,
						range: 'Touch',
						duration: 'Instant',
						mod: '+1',
						effect: 'Heals a creature you touch.',
						dc: '12',
						notes: '',
					},
				],
				notes: '',
			},
		],
		notes: 'Limited spellcasting abilities.',
	},
	talents: {
		data: [
			{
				label: 'Languages',
				value: 'Common, Elvish, Dwarvish',
			},
			{
				label: 'Tracking',
				value: 'Expert tracker in wilderness.',
			},
		],
		notes: 'Talented in survival and diplomacy.',
	},
	gear: {
		wealth: [
			{ type: 'gold', amount: '50' },
			{ type: 'silver', amount: '5' },
		],
		maxSlots: '15',
		items: [
			{ slot: '1', name: 'Healing Potion', count: '2', capacity: '10 HP' },
			{ slot: '2', name: 'Rope', count: '1', capacity: '50 ft.' },
			{
				slot: '3',
				name: 'Map of Middle-earth',
				count: '1',
				capacity: 'Navigation',
			},
		],
		freeCarry: 'Bedroll, Flint and Steel',
		notes: 'Prepared for long journeys.',
	},
} as const;
