import type { DeepPartial } from '@/types/DeepPartial';

export const deepMerge = <T>(prev: T, updates: DeepPartial<T>): T => {
	const merged = { ...prev };

	for (const key in updates) {
		if (typeof merged[key] === 'object' && !Array.isArray(merged[key])) {
			merged[key] = deepMerge(
				merged[key],
				updates[key] as DeepPartial<(typeof merged)[typeof key]>,
			);
		} else {
			merged[key] = updates[key] as (typeof merged)[typeof key];
		}
	}

	return merged;
};
