import type { DeepPartial } from '@/types/DeepPartial';

export const deepMerge = <T>(prev: T, updates: DeepPartial<T>): T =>
	_deepMerge(JSON.parse(JSON.stringify(prev)), updates) as T;

const _deepMerge = (
	prev: Record<string, unknown>,
	updates: Record<string, unknown>,
) => {
	for (const key in prev) {
		if (Object.prototype.hasOwnProperty.call(updates, key)) {
			if (prev[key] instanceof Object && updates[key] instanceof Object) {
				_deepMerge(
					prev[key] as Record<string, unknown>,
					updates[key] as Record<string, unknown>,
				);
			} else {
				prev[key] = updates[key];
			}
		}
	}

	return prev;
};
