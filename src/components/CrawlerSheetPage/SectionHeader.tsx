import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import NewspaperIcon from '@heroicons/react/24/solid/NewspaperIcon';

import { isKeyExit } from '@/utils/IsKeyExit';
import { resizeElement } from '@/utils/ResizeElement';

const buttonClassName = 'p-1 w-8 rounded-sm';

export const SectionHeader = ({
	edit,
	notes,
}: {
	readonly edit?: {
		isToggled: boolean;
		handleClick: () => void;
	};
	readonly notes?: {
		isEditing: boolean;
		value: string;
		persistValue: (value: string) => void;
		toggleEditor: (isEnabled: boolean) => void;
	};
}) => {
	const [showNotes, setShowNotes] = useState(!!notes?.value);

	const [notesDisplay, setNotesDisplay] = useState(notes?.value || '');
	useEffect(() => {
		setNotesDisplay(notes?.value || '');
	}, [notes?.value]);

	const persistTimeoutRef = useRef<number>(undefined);
	const handleNotesChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
			setNotesDisplay(value);
			clearTimeout(persistTimeoutRef.current);
			persistTimeoutRef.current = setTimeout(() => {
				notes?.persistValue(value);
				persistTimeoutRef.current = undefined;
			}, 500);
		},
		[notes],
	);

	return (
		<div className="mx-2 border-t border-b">
			<div className="p-2 flex gap-2 justify-end">
				{notes ? (
					<button
						className={buttonClassName}
						onClick={() => setShowNotes((prev) => !prev)}
					>
						<NewspaperIcon />
					</button>
				) : null}
				{edit ? (
					<button className={buttonClassName} onClick={edit.handleClick}>
						{edit.isToggled ? <ArrowDownOnSquareIcon /> : <CogIcon />}
					</button>
				) : null}
			</div>
			{showNotes && (
				<div className="p-2 pt-0">
					{notes?.isEditing ? (
						<textarea
							autoFocus
							className="-mb-1"
							onChange={handleNotesChange}
							onFocus={resizeElement}
							onKeyDown={(e) => {
								if (isKeyExit(e, true)) {
									notes?.toggleEditor(false);
								} else {
									resizeElement(e);
								}
							}}
							value={notesDisplay}
						/>
					) : (
						<button
							className="border-none w-full min-h-12 p-2 text-left bg-(--color-primary-2)"
							onClick={() => notes?.toggleEditor(true)}
						>
							<p className="min-h-12 px-2 overflow-scroll whitespace-pre-wrap">
								{notesDisplay || (
									<i className="text-(--color-primary-3) select-none">
										Write notes here...
									</i>
								)}
							</p>
						</button>
					)}
				</div>
			)}
		</div>
	);
};
