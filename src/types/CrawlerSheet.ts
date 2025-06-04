import type { DeepPartial } from './DeepPartial';

export interface CrawlerSheet {
	core: Readonly<{
		name: string;
		player: string;
		class: string;
		ancestry: string;
		background: string;
		title: string;
		alignment: string;
		deity: string;
		lvl: string;
		xp: Readonly<{ current: string; required: string }>;
		notes: string;
	}>;
	stats: Readonly<{
		data: readonly Readonly<{ name: string; score: string; mod: string }>[];
		notes: string;
	}>;
	defenses: Readonly<{
		ac: string;
		hp: Readonly<{ current: string; max: string }>;
		notes: string;
	}>;
	weapons: Readonly<{
		data: readonly Readonly<{
			name: string;
			type: string;
			range: string;
			mod: string;
			damage: string;
			notes: string;
		}>[];
		notes: string;
	}>;
	spells: Readonly<{
		tiers: readonly Readonly<{
			name: string;
			data: readonly Readonly<{
				name: string;
				forgotten: boolean;
				range: string;
				duration: string;
				mod: string;
				dc: string;
				effect: string;
				notes: string;
			}>[];
			notes: string;
		}>[];
		notes: string;
	}>;
	talents: Readonly<{
		data: readonly Readonly<{ label: string; value: string }>[];
		notes: string;
	}>;
	gear: Readonly<{
		wealth: readonly Readonly<{ type: string; amount: string }>[];
		maxSlots: string;
		items: readonly Readonly<{
			slot: string;
			name: string;
			count: string;
			capacity: string;
		}>[];
		freeCarry: string;
		notes: string;
	}>;
}

export type CrawlerSheetUpdates = DeepPartial<CrawlerSheet>;

export type UpdateCrawlerSheet = (
	crawlerSheetUpdates: CrawlerSheetUpdates,
) => void;
