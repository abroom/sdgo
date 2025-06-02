export const StatsEditor = () => {
	return (
		<>
			{data.map((stat, index) => (
				<pre>TODO StatsEditorRow</pre>
			))}
			<button
				className="flex gap-2 size-fit p-2 border rounded self-center"
				onClick={() =>
					setCharacterSheet((prev) => ({
						...prev,
						stats: {
							...prev.stats,
							data: [...prev.stats.data, { name: '', score: '', mod: '' }],
						},
					}))
				}
			>
				<PlusCircleIcon width={24} />
				Add Stat
			</button>
		</>
	);
};
