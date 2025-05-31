import classNames from 'classnames';
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
		<button
			className={classNames('core-item', 'md:col-span-1', {
				'sm:col-span-full': label === 'Player',
			})}
			disabled={isEditing}
			onClick={startEditing}
		>
			{isEditing ? (
				<div>
					<input
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
					<p>{value}</p>
				</div>
			)}
			<p>{label}</p>
		</button>
	);
};
