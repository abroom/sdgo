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
			<div className="flex gap-[0.5rem]">
				{current.isEditing ? (
					<input
						className="max-w-[calc((100%-1.5rem)/2)]"
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
					<button className="min-w-[5rem]" onClick={current.startEditing}>
						<p>{current.value}</p>
					</button>
				)}
				<p className="px-0 w-[0.5rem] text-center">/</p>
				{required.isEditing ? (
					<input
						className="max-w-[calc((100%-1.5rem)/2)]"
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
					<button className="min-w-[5rem]" onClick={required.startEditing}>
						<p>{required.value}</p>
					</button>
				)}
			</div>
		</div>
	);
};
