import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useState } from 'react';

import { SectionUtils } from '../SectionUtils';
import type { CharacterSheetSectionProps } from '../types';

export const Stats = ({
	characterSheet: {
		stats: { data, notes },
	},
	setCharacterSheet,
}: CharacterSheetSectionProps) => {
	const [isContentVisible, setIsContentVisible] = useState(true);
	const [editors, setEditors] = useState<Set<string>>(new Set());

	return (
		<section className="stats">
			<button
				className={classNames('w-full', { toggled: !isContentVisible })}
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Stats</h2>
			</button>
			{isContentVisible && (
				<>
					<SectionUtils
						notes={notes}
						handleNotesChange={({ target: { value } }) =>
							setCharacterSheet((prev) => ({
								...prev,
								stats: {
									...prev.stats,
									notes: value,
								},
							}))
						}
						isEditing={editors.size > 0}
						handleSettingsClick={() => {
							setEditors((prev) => {
								return prev.size ? new Set() : new Set(['stats']);
							});
						}}
					/>
					<div className="values grid gap-4">
						<div className="stat-header grid grid-cols-3 text-center px-4 gap-2">
							<span>Name</span>
							<span>Score</span>
							<span>Mod</span>
						</div>
						{editors.has('stats') ? (
							<>
								{data.map((stat, index) => (
									<div
										key={index}
										className="stat border border-(--off-white) rounded-lg h-[4.5rem] p-2 grid grid-cols-3 text-center"
									>
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
											/>
											<button
												className="text-red-500 p-2"
												onClick={() =>
													setCharacterSheet((prev) => ({
														...prev,
														stats: {
															...prev.stats,
															data: prev.stats.data.filter(
																(_, i) => i !== index,
															),
														},
													}))
												}
											>
												<TrashIcon width={24} />
											</button>
										</span>
									</div>
								))}
								<button
									className="flex gap-2 size-fit p-2 border rounded self-center"
									onClick={() =>
										setCharacterSheet((prev) => ({
											...prev,
											stats: {
												...prev.stats,
												data: [
													...prev.stats.data,
													{ name: '', score: '', mod: '' },
												],
											},
										}))
									}
								>
									<PlusCircleIcon width={24} />
									Add Stat
								</button>
							</>
						) : (
							data.map((stat, index) => (
								<div
									key={index}
									className="stat border border-(--off-white) rounded-lg h-[4.5rem] p-2 grid grid-cols-3 text-center gap-2"
								>
									<span className="flex flex-col items-center justify-center">
										<p className="text-2xl uppercase">
											{stat.name.substring(0, 3)}
										</p>
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
										<button
											className="col-span-2 grid grid-cols-2"
											onClick={() => {
												setEditors((prev) => {
													prev.add(stat.name);
													return new Set(prev);
												});
											}}
										>
											<div className="flex items-center justify-center">
												<span className="text-4xl">{stat.score}</span>
											</div>
											<div className="flex items-center justify-center">
												<span className="text-4xl">{stat.mod}</span>
											</div>
										</button>
									)}
								</div>
							))
						)}
					</div>
				</>
			)}
		</section>
	);
};
