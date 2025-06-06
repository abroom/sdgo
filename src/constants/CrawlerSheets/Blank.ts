import type { CrawlerSheet } from '../../types/CrawlerSheet';

export const CRAWLER_SHEET__BLANK: CrawlerSheet = {
	core: {
		name: '',
		player: '',
		class: '',
		ancestry: '',
		background: '',
		title: '',
		alignment: '',
		deity: '',
		lvl: '',
		xp: { current: '', required: '' },
		notes:
			"Click the gear icons to view hidden elements or add more items.\n\nThe newspaper will hide or show a section's notes.\n\nMost elements become editable when clicked.\n\nIn the last section, you can save or load your sheet from a json file or from a template. Any changes will be overwritten when loading!",
	},
	stats: {
		data: [],
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
		tiers: [],
		notes: '',
	},
	talents: {
		data: [],
		notes: '',
	},
	gear: {
		wealth: [],
		slots: [],
		freeCarry: [],
		notes: '',
	},
} as const;
