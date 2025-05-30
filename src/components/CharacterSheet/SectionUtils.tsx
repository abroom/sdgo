import {
	ArrowDownOnSquareIcon,
	CogIcon,
	NewspaperIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

export const SectionUtils = ({
	notes,
	handleNotesChange,
	isEditing,
	handleSettingsClick,
}: {
	notes: string;
	handleNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	isEditing: boolean;
	handleSettingsClick: () => void;
}) => {
	const [showNotes, setShowNotes] = useState(!!notes);
	const [editNotes, setEditNotes] = useState(false);

	return (
		<div className="px-[1rem]">
			<hr />
			<div className="flex justify-end gap-2 p-2 pt-[0.5rem]">
				<button
					className="w-[2rem] p-[0.25rem] rounded-sm"
					onClick={() => setShowNotes((prev) => !prev)}
				>
					<NewspaperIcon />
				</button>
				<button
					className="w-[2rem] p-[0.25rem] rounded-sm"
					onClick={() => {
						if (editNotes) setEditNotes(false);
						if (isEditing || !editNotes) handleSettingsClick();
					}}
				>
					{isEditing || editNotes ? <ArrowDownOnSquareIcon /> : <CogIcon />}
				</button>
			</div>
			{showNotes && (
				<div>
					<p className="text-sm font-semibold">Notes</p>
					{editNotes ? (
						<div className="p-2">
							<textarea
								value={notes}
								onChange={handleNotesChange}
								onKeyDown={(e) => {
									if (['Escape'].includes(e.key)) {
										setEditNotes(false);
									} else if (['Enter'].includes(e.key) && e.shiftKey) {
										setEditNotes(false);
									} else {
										const { style, scrollHeight } =
											e.target as HTMLTextAreaElement;
										style.height = `${scrollHeight}px`;
									}
								}}
								onFocus={(e) => {
									const { style, scrollHeight } =
										e.target as HTMLTextAreaElement;
									style.height = `${scrollHeight}px`;
								}}
								autoFocus
							/>
						</div>
					) : (
						<div className="p-2">
							<button
								className="w-full min-h-[4rem] p-[1rem] text-left bg-(--black-3)"
								onClick={() => setEditNotes(true)}
							>
								<p className="whitespace-pre-wrap">
									{notes || <i className="text-(--gray)">Click to edit</i>}
								</p>
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
