import type { CrawlerSheet } from '../../types/CrawlerSheet';

export const CRAWLER_SHEET__DARK_SUNS_SHADOW: CrawlerSheet = {
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
		notes:
			"This is the Dark Sun's Shadow template. Based on Modlist: Orange, a Dark Sun inspired mod of Shadowdark. Psionics stat. Themed wealth types and crawling kit.",
	},
	stats: {
		data: [
			{ name: 'Strength', score: '', mod: '' },
			{ name: 'Dexterity', score: '', mod: '' },
			{ name: 'Constitution', score: '', mod: '' },
			{ name: 'Intelligence', score: '', mod: '' },
			{ name: 'Wisdom', score: '', mod: '' },
			{ name: 'Charisma', score: '', mod: '' },
			{ name: 'Psionics', score: '', mod: '' },
		],
		notes: '',
	},
	defenses: {
		ac: '',
		hp: { current: '', max: '' },
		notes: '',
	},
	weapons: {
		data: [],
		notes: '',
	},
	spells: {
		tiers: [
			{
				name: 'Psionics',
				data: [],
				notes:
					'PSI Points: TBD\nPSI Points Limit: TBD\n\nPSI Types Known:\n- TBD',
			},
		],
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
			{ type: 'Genuine Patellae', quantity: '' },
			{ type: 'Stone Pounds', quantity: '' },
			{ type: 'Clay Pennies', quantity: '' },
		],
		slots: [
			{ name: 'Flint and steel', quantity: '1' },
			{ name: 'Torch', quantity: '1' },
			{ name: 'Torch', quantity: '1' },
			{ name: 'Rations', quantity: '3 / 3' },
			{ name: 'Bone spikes', quantity: '10 / 10' },
			{ name: 'Grappling hook', quantity: '1' },
			{ name: 'Rope', quantity: "60' / 60'" },
		],
		freeCarry: [{ name: 'Backpack', quantity: '1' }],
		notes: '',
	},
} as const;
