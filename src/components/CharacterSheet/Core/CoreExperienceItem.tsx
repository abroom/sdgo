import type { ChangeEvent } from 'react';

export const CoreExperienceItem = ({
	current,
	required,
}: {
	current: {
		isEditing: boolean;
		value: string;
		handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
		startEditing: () => void;
		stopEditing: () => void;
	};
	required: {
		isEditing: boolean;
		value: string;
		handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
		startEditing: () => void;
		stopEditing: () => void;
	};
}) => {
	if (
		!(
			current.isEditing ||
			required.isEditing ||
			current.value ||
			required.value
		)
	) {
		return null;
	}

	return (
		<div>
			<p>Experience</p>
			<div className="flex gap-2">
				{current.isEditing ? (
					<input
						type="text"
						value={current.value}
						onChange={current.handleChange}
						onKeyDown={(e) => {
							if (['Enter', 'Escape'].includes(e.key)) {
								current.stopEditing();
							}
						}}
						autoFocus
					/>
				) : (
					<button className="min-w-[5em]" onClick={current.startEditing}>
						<p>{current.value}</p>
					</button>
				)}
				<p className="px-0">/</p>
				{required.isEditing ? (
					<input
						type="text"
						value={required.value}
						onChange={required.handleChange}
						onKeyDown={(e) => {
							if (['Enter', 'Escape'].includes(e.key)) {
								required.stopEditing();
							}
						}}
						autoFocus
					/>
				) : (
					<button className="min-w-[5em]" onClick={required.startEditing}>
						<p>{required.value}</p>
					</button>
				)}
			</div>
		</div>
	);
};
