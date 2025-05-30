import classNames from 'classnames';
import { useState } from 'react';

import { SectionUtils } from '../SectionUtils';
import type { CharacterSheetSectionProps } from '../types';

export const Defenses = ({
	characterSheet: {
		defenses: { ac, hp, notes },
	},
	setCharacterSheet,
}: CharacterSheetSectionProps) => {
	const [isContentVisible, setIsContentVisible] = useState(true);
	const [editors, setEditors] = useState<Set<string>>(new Set());

	return (
		<section className="defenses">
			<button
				className={classNames('w-full', { toggled: !isContentVisible })}
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Defenses</h2>
			</button>
			{isContentVisible && (
				<>
					<SectionUtils
						notes={notes}
						handleNotesChange={({ target: { value } }) =>
							setCharacterSheet((prev) => ({
								...prev,
								defenses: {
									...prev.defenses,
									notes: value,
								},
							}))
						}
						isEditing={editors.size > 0}
						handleSettingsClick={() => {
							setEditors((prev) => {
								return prev.size
									? new Set()
									: new Set(['ac', 'hp.current', 'hp.max']);
							});
						}}
					/>
					<div className="values md:flex-row">
						<div className="h-[4.5rem] border rounded-[8px] flex-grow md:max-w-1/2 flex">
							<div className="border-r border-dotted min-w-[7rem] p-[0.5rem]">
								<p className="text-2xl text-center">AC</p>
								<p className="text-sm text-center">Armor Class</p>
							</div>
							<div className="flex-grow p-[0.5rem]">
								{editors.has('ac') ? (
									<input
										className="h-full w-full text-center text-2xl"
										type="text"
										value={ac}
										autoFocus
										onChange={({ target: { value } }) =>
											setCharacterSheet((prev) => ({
												...prev,
												defenses: {
													...prev.defenses,
													ac: value,
												},
											}))
										}
										onKeyDown={(e) => {
											if (['Enter', 'Escape'].includes(e.key)) {
												setEditors((prev) => {
													prev.delete('ac');
													return new Set(prev);
												});
											}
										}}
									/>
								) : (
									<button
										className="h-full w-full text-4xl"
										onClick={() => {
											setEditors((prev) => {
												prev.add('ac');
												return new Set(prev);
											});
										}}
									>
										{ac}
									</button>
								)}
							</div>
						</div>
						<div className="h-[4.5rem] border rounded-[8px] flex-grow md:max-w-1/2 flex">
							<div className="border-r border-dotted min-w-[7rem] p-[0.5rem]">
								<p className="text-2xl text-center">HP</p>
								<p className="text-sm text-center">Hit Points</p>
							</div>
							<div className="flex-grow flex justify-around items-center gap-[0.25rem]">
								<div className="flex flex-grow h-full max-w-[calc((100%-1.5rem)/2)] p-[0.5rem]">
									{editors.has('hp.current') ? (
										<input
											className="h-full flex-grow text-center text-2xl"
											type="text"
											value={hp.current}
											autoFocus
											onChange={({ target: { value } }) =>
												setCharacterSheet((prev) => ({
													...prev,
													defenses: {
														...prev.defenses,
														hp: {
															...prev.defenses.hp,
															current: value,
														},
													},
												}))
											}
											onKeyDown={(e) => {
												if (['Enter', 'Escape'].includes(e.key)) {
													setEditors((prev) => {
														prev.delete('hp.current');
														return new Set(prev);
													});
												}
											}}
										/>
									) : (
										<button
											className="flex-grow text-4xl"
											onClick={() => {
												setEditors((prev) => {
													prev.add('hp.current');
													return new Set(prev);
												});
											}}
										>
											{hp.current}
										</button>
									)}
								</div>
								<p className="text-center text-4xl w-[1rem]">/</p>
								<div className="flex flex-grow h-full max-w-[calc((100%-1.5rem)/2)] p-[0.5rem]">
									{editors.has('hp.max') ? (
										<input
											className="h-full flex-grow text-center text-2xl"
											type="text"
											value={hp.max}
											autoFocus
											onChange={({ target: { value } }) =>
												setCharacterSheet((prev) => ({
													...prev,
													defenses: {
														...prev.defenses,
														hp: {
															...prev.defenses.hp,
															max: value,
														},
													},
												}))
											}
											onKeyDown={(e) => {
												if (['Enter', 'Escape'].includes(e.key)) {
													setEditors((prev) => {
														prev.delete('hp.max');
														return new Set(prev);
													});
												}
											}}
										/>
									) : (
										<button
											className="flex-grow text-4xl"
											onClick={() => {
												setEditors((prev) => {
													prev.add('hp.max');
													return new Set(prev);
												});
											}}
										>
											{hp.max}
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</section>
	);
};
