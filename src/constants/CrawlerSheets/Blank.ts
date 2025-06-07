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
			"Welcome to Shadowdark GO!\nShadowdark GO is a flexible, digital character sheet UI based on the Shadowdark RPG. No information is saved between sessions so make sure to save the crawler sheet to your computer if you want to reuse your crawler in the future.\n\nYour crawler sheet is divided up into multiple sections. Each section is collapsible by clicking on the section's title.\nClick a section's gear button to view auto-hidden elements or to add more section items if applicable.\nThe newspaper button will hide or show a section's notes.\nMost elements become editable when clicked.\n\nThis is the blank template for a crawler sheet. Nothing is filled in except for this note. Load a template to get going quickly with the common stat blocks and crawler gear.",
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
