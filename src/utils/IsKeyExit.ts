import { type KeyboardEvent } from 'react';

const noModKeys = new Set(['Escape']);
const modKeys = new Set(['Enter']);

export const isKeyExit = (
	{ key, shiftKey }: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
	requireMod = false,
): boolean => {
	if (noModKeys.has(key)) {
		return true;
	} else if (requireMod) {
		return modKeys.has(key) && shiftKey;
	} else {
		return modKeys.has(key);
	}
};
