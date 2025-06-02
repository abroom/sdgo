export const StatsList = () => {

	<div className="stats-header grid grid-cols-3 gap-2 text-center">
		{['Name', 'Score', 'Mod'].map((label) => (
			<span key={label} className="text-(--grey) text-sm">
				{label}
			</span>
		))}
	</div>
	<button
		key={index}
		className="stat border rounded-lg h-[4.5rem] p-2 grid grid-cols-3 text-center gap-2"
		onClick={() => {
			setEditors((prev) => {
				prev.add(stat.name);
				return new Set(prev);
			});
		}}
	>
		<span className="flex flex-col items-center justify-center">
			<p className="text-2xl uppercase">{stat.name.substring(0, 3)}</p>
			<p className="text-sm text-(--grey)">{stat.name}</p>
		</span>
		{editors.has(stat.name) ? (
			<>
				<input
					className="text-xl text-center border rounded px-2"
					type="text"
					value={stat.score}
					placeholder="Score"
					autoFocus
					onChange={({ target: { value } }) =>
						setCharacterSheet((prev) => ({
							...prev,
							stats: {
								...prev.stats,
								data: prev.stats.data.map((s, i) =>
									i === index ? { ...s, score: value } : s,
								),
							},
						}))
					}
					onKeyDown={(e) => {
						if (['Enter', 'Escape'].includes(e.key)) {
							setEditors((prev) => {
								prev.delete(stat.name);
								return new Set(prev);
							});
						}
					}}
				/>
				<input
					className="text-xl text-center border rounded px-2"
					type="text"
					value={stat.mod}
					placeholder="Mod"
					onChange={({ target: { value } }) =>
						setCharacterSheet((prev) => ({
							...prev,
							stats: {
								...prev.stats,
								data: prev.stats.data.map((s, i) =>
									i === index ? { ...s, mod: value } : s,
								),
							},
						}))
					}
					onKeyDown={(e) => {
						if (['Enter', 'Escape'].includes(e.key)) {
							setEditors((prev) => {
								prev.delete(stat.name);
								return new Set(prev);
							});
						}
					}}
				/>
			</>
		) : (
			<div className="col-span-2 grid grid-cols-2">
				<div className="flex items-center justify-center">
					<span className="text-4xl">{stat.score}</span>
				</div>
				<div className="flex items-center justify-center">
					<span className="text-4xl">{stat.mod}</span>
				</div>
			</div>
		)}
	</button>;
};
