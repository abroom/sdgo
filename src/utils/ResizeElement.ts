import { type FocusEvent, type KeyboardEvent } from 'react';

export const resizeElement = (e: FocusEvent | KeyboardEvent) => {
	const { style, scrollHeight } = e.target as HTMLElement;
	style.height = `${scrollHeight}px`;
};
