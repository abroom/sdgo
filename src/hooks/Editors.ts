import { useCallback, useMemo, useState } from 'react';

import type { DeepKeyOf } from '@/types/DeepKeyOf';
import type { Prettify } from '@/types/Prettify';

export type Editors<T extends object, EditorKey = DeepKeyOf<T>> = Prettify<{
	enabled: ReadonlySet<EditorKey>;
	disableAll: () => void;
	toggle: (editorKeys: EditorKey[], enabled?: boolean) => void;
}>;

export const useEditors = <T extends object, EditorKey = DeepKeyOf<T>>() => {
	const [enabled, setEnabled] = useState<ReadonlySet<EditorKey>>(new Set());

	const disableAll = useCallback(() => {
		setEnabled(new Set());
	}, []);

	const toggle = useCallback((editorKeys: EditorKey[], enabled?: boolean) => {
		setEnabled((prev) => {
			const next = new Set(prev);

			editorKeys.forEach((editorKey) => {
				const addKey = enabled ?? !prev.has(editorKey);

				if (addKey) {
					next.add(editorKey);
				} else {
					next.delete(editorKey);
				}
			});

			return next;
		});
	}, []);

	return useMemo<Editors<T, EditorKey>>(
		() => ({
			enabled,
			disableAll,
			toggle,
		}),
		[enabled, disableAll, toggle],
	);
};
