import { type FocusEvent, type KeyboardEvent } from 'react';

export const resizeElement = (e: FocusEvent | KeyboardEvent) => {
	const { offsetHeight, scrollHeight, style } = e.target as HTMLElement;
	style.height = `${Math.max(offsetHeight, scrollHeight)}px`;
};
