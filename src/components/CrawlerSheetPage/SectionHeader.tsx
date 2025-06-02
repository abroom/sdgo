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

	const persistTimoutRef = useRef<number>(null);
	const handleNotesChange = useCallback(
		({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
			setNotesDisplay(value);

			if (persistTimoutRef.current) {
				clearTimeout(persistTimoutRef.current);
			}
			persistTimoutRef.current = setTimeout(() => {
				notes?.persistValue(value);
				persistTimoutRef.current = null;
			}, 500);
		},
		[notes],
	);

	return (
		<div className="section-header border-t mx-2">
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
				<div>
					<p className="text-sm font-semibold">Notes</p>
					{notes?.isEditing ? (
						<div className="p-2">
							<textarea
								autoFocus
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
						</div>
					) : (
						<div className="p-2">
							<button
								className="w-full min-h-[4rem] p-[1rem] text-left bg-(--black-3)"
								onClick={() => notes?.toggleEditor(true)}
							>
								<p className="overflow-scroll whitespace-pre-wrap">
									{notesDisplay || (
										<i className="text-(--gray) select-none">Click to edit</i>
									)}
								</p>
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
