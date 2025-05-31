import { type ChangeEvent } from 'react';

export const CoreStandardItem = ({
	isEditing,
	label,
	value,
	handleChange,
	startEditing,
	stopEditing,
}: {
	isEditing: boolean;
	label: string;
	value: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	startEditing: () => void;
	stopEditing: () => void;
}) => {
	if (!(isEditing || value)) {
		return null;
	}

	return (
		<div>
			<p>{label}</p>
			{isEditing ? (
				<div>
					<input
						className="h-[46px]"
						type="text"
						value={value}
						onChange={handleChange}
						onKeyDown={(e) => {
							if (['Enter', 'Escape'].includes(e.key)) {
								stopEditing();
							}
						}}
						autoFocus
					/>
				</div>
			) : (
				<div>
					<button className="w-full text-left" onClick={startEditing}>
						<p>{value}</p>
					</button>
				</div>
			)}
		</div>
	);
};
