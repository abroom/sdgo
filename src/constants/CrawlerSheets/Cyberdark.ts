import type { CrawlerSheet } from '../../types/CrawlerSheet';

export const CRAWLER_SHEET__CYBERDARK: CrawlerSheet = {
	core: {
		name: '',
		player: '',
		class: '',
		ancestry: '',
		background: '',
		title: '',
		alignment: '',
		deity: '',
		lvl: '1',
		xp: { current: '0', required: '10' },
		notes: '',
	},
	stats: {
		data: [
			{ name: 'Strength', score: '', mod: '' },
			{ name: 'Dexterity', score: '', mod: '' },
			{ name: 'Constitution', score: '', mod: '' },
			{ name: 'Intelligence', score: '', mod: '' },
			{ name: 'Wisdom', score: '', mod: '' },
			{ name: 'Charisma', score: '', mod: '' },
		],
		notes: '',
	},
	defenses: {
		ac: '',
		hp: { current: '', max: '' },
		notes: 'Armor Bulk: 0',
	},
	weapons: {
		data: [],
		notes: '',
	},
	spells: {
		tiers: [],
		notes: '',
	},
	talents: {
		data: [
			{
				name: 'Languages',
				description: 'Common',
			},
		],
		notes: '',
	},
	gear: {
		wealth: [
			{ type: 'Ꞓrypt', quantity: '' },
			{ type: 'CHROME Slots', quantity: '' },
			{ type: 'Living Standard', quantity: '' },
			{ type: 'TraumaCare', quantity: '' },
		],
		slots: [
			{ name: 'Flint and steel UUID', quantity: '1' },
			{ name: 'LITE VPN', quantity: '1' },
			{ name: 'LITE VPN', quantity: '1' },
			{ name: 'Rations', quantity: '3 / 3' },
			{ name: 'Carbon spikes', quantity: '10 / 10' },
			{ name: 'Grappling hook', quantity: '1' },
			{ name: 'Rope', quantity: "60' / 60'" },
		],
		freeCarry: [{ name: 'Backpack', quantity: '1' }],
		notes: '',
	},
} as const;
