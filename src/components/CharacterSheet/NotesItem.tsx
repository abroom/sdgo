import type { ChangeEvent } from 'react';

export const NotesItem = ({
	isEditing,
	note,
	handleChange,
	startEditing,
	stopEditing,
}: {
	isEditing: boolean;
	note: string;
	handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	startEditing: () => void;
	stopEditing: () => void;
}) => {
	if (!(isEditing || note)) {
		return null;
	}

	return (
		<div>
			<p>Notes</p>
			{isEditing ? (
				<div>
					<textarea
						value={note}
						onChange={handleChange}
						onKeyDown={(e) => {
							if (
								['Escape'].includes(e.key) ||
								(['Enter'].includes(e.key) && e.shiftKey)
							) {
								stopEditing();
							} else {
								const { style, scrollHeight } = e.target as HTMLTextAreaElement;
								style.height = `${scrollHeight}px`;
							}
						}}
						onFocus={(e) => {
							const { style, scrollHeight } = e.target as HTMLTextAreaElement;
							style.height = `${scrollHeight}px`;
						}}
						autoFocus
					/>
				</div>
			) : (
				<div>
					<button className="w-full text-left" onClick={startEditing}>
						<p className="whitespace-pre-wrap">{note}</p>
					</button>
				</div>
			)}
		</div>
	);
};
