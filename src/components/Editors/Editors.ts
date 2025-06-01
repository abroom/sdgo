import { type ReactNode, useCallback, useState } from 'react';
import type { DeepKeyOf } from '@/types/DeepKeyOf';

export interface EditorsControls<T extends object, EditorKey = DeepKeyOf<T>> {
	editors: ReadonlySet<EditorKey>;
	clearEditors: () => void;
	toggleEditors: (editorKeys: EditorKey[], enabled?: boolean) => void;
}

export const Editors = <T extends object, EditorKey = DeepKeyOf<T>>({
	children: child,
}: {
	readonly children: (
		editorControls: EditorsControls<T, EditorKey>,
	) => ReactNode;
}) => {
	const [editors, setEditors] = useState<ReadonlySet<EditorKey>>(new Set());

	const clearEditors = useCallback(() => {
		setEditors(new Set());
	}, [setEditors]);

	const toggleEditors = useCallback(
		(editorKeys: EditorKey[], enabled?: boolean) => {
			setEditors((prev) => {
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
		},
		[setEditors],
	);

	return child({
		editors,
		clearEditors,
		toggleEditors,
	});
};
