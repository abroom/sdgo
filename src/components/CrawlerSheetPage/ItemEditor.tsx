import {
	type ChangeEvent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import TrashIcon from '@heroicons/react/24/solid/TrashIcon';

import { isKeyExit } from '@/utils/IsKeyExit';

export const ItemEditor = memo(function ItemEditor({
	value,
	persist,
	remove,
	toggle,
}: {
	readonly value: string;
	readonly persist: (value: string) => void;
	readonly remove: () => void;
	readonly toggle: () => void;
}) {
	const [valueDisplay, setValueDisplay] = useState(value);
	useEffect(() => {
		setValueDisplay(value);
	}, [value]);

	const persistTimeoutRef = useRef<number>(undefined);
	const handleChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			setValueDisplay(value);
			clearTimeout(persistTimeoutRef.current);
			persistTimeoutRef.current = setTimeout(() => {
				persist(value);
				persistTimeoutRef.current = undefined;
			}, 500);
		},
		[persist],
	);

	return (
		<div>
			<span className="mb-2 p-2 flex gap-2 items-center justify-center">
				<input
					className="text-xl h-[2.6rem] border rounded px-2"
					type="text"
					value={valueDisplay}
					placeholder="Weapon Name"
					onChange={handleChange}
					onKeyDown={(e) => {
						if (isKeyExit(e)) {
							toggle();
						}
					}}
				/>
				<button
					className="border-red-950 outline-red-300 shadow-red-300 p-2 bg-red-950 text-red-500"
					onClick={() => {
						clearTimeout(persistTimeoutRef.current);
						remove();
					}}
				>
					<TrashIcon width={24} />
				</button>
			</span>
		</div>
	);
});
