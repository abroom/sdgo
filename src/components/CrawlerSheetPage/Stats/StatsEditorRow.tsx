import TrashIcon from '@heroicons/react/24/solid/TrashIcon';

export const StatsEditorRow = () => {
	return (
		<div className="stat border rounded-lg h-[4.5rem] p-2 grid grid-cols-3 text-center">
			<span className="col-span-full flex flex-row gap-2 items-center justify-center p-2">
				<input
					className="text-xl h-[2.6rem] border rounded px-2"
					type="text"
					value={stat.name}
					placeholder="Stat Name"
					onChange={({ target: { value } }) =>
						setCharacterSheet((prev) => ({
							...prev,
							stats: {
								...prev.stats,
								data: prev.stats.data.map((s, i) =>
									i === index ? { ...s, name: value } : s,
								),
							},
						}))
					}
					onKeyDown={(e) => {
						if (['Enter', 'Escape'].includes(e.key)) {
							setEditors((prev) => {
								prev.delete('stats');
								return new Set(prev);
							});
						}
					}}
				/>
				<button
					className="text-red-500 p-2"
					onClick={() =>
						setCharacterSheet((prev) => ({
							...prev,
							stats: {
								...prev.stats,
								data: prev.stats.data.filter((_, i) => i !== index),
							},
						}))
					}
				>
					<TrashIcon width={24} />
				</button>
			</span>
		</div>
	);
};
