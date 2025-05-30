import classNames from 'classnames';
import { useState } from 'react';
import { TrashIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

import { SectionUtils } from '../SectionUtils';
import type { CharacterSheet, CharacterSheetSectionProps } from '../types';
import { useCallback } from 'react';

export const Weapons = ({
	characterSheet: { weapons },
	setCharacterSheet,
}: CharacterSheetSectionProps) => {
	const [isContentVisible, setIsContentVisible] = useState(true);
	const [editors, setEditors] = useState<Set<string>>(new Set());

	const fields: (keyof CharacterSheet['weapons']['data'][number])[] = [
		'name',
		'type',
		'range',
		'mod',
		'damage',
		'notes',
	];

	const handleFieldChange = useCallback(
		(index: number, field: string, value: string) => {
			setCharacterSheet((prev) => {
				const updatedWeapons = [...prev.weapons.data];
				updatedWeapons[index] = {
					...updatedWeapons[index],
					[field]: value,
				};
				return {
					...prev,
					weapons: {
						...prev.weapons,
						data: updatedWeapons,
					},
				};
			});
		},
		[setCharacterSheet],
	);

	const handleDeleteWeapon = useCallback(
		(index: number) => {
			setCharacterSheet((prev) => ({
				...prev,
				weapons: {
					...prev.weapons,
					data: prev.weapons.data.filter((_, i) => i !== index),
				},
			}));
		},
		[setCharacterSheet],
	);

	const handleAddWeapon = useCallback(() => {
		setCharacterSheet((prev) => ({
			...prev,
			weapons: {
				...prev.weapons,
				data: [
					...prev.weapons.data,
					{ name: '', type: '', range: '', mod: '', damage: '', notes: '' },
				],
			},
		}));
		setEditors((prev) => {
			prev.add(`weapon.${prev.size}`);
			return new Set(prev);
		});
	}, [setCharacterSheet]);

	return (
		<section className="weapons">
			<button
				className={classNames('w-full', { toggled: !isContentVisible })}
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Weapons</h2>
			</button>
			{isContentVisible && (
				<>
					<SectionUtils
						notes={weapons.notes}
						handleNotesChange={({ target: { value } }) =>
							setCharacterSheet((prev) => ({
								...prev,
								weapons: {
									...prev.weapons,
									notes: value,
								},
							}))
						}
						isEditing={editors.size > 0}
						handleSettingsClick={() => {
							setEditors((prev) => {
								return prev.size ? new Set() : new Set(['weapons']);
							});
						}}
					/>
					<div className="values">
						{weapons.data.map((weapon, index) => (
							<div key={index} className="weapon-item border rounded-[8px]">
								<div className="p-1">
									<div
										className={classNames(
											'flex',
											'gap-2',
											'items-center',
											'p-2',
											{
												'pb-0': !editors.has('weapons'),
											},
										)}
									>
										{editors.has('weapons') ? (
											<>
												<input
													type="text"
													value={weapon.name || ''}
													placeholder="Weapon name"
													onChange={({ target: { value } }) =>
														handleFieldChange(index, 'name', value)
													}
													onKeyDown={(e) => {
														if (['Enter', 'Escape'].includes(e.key)) {
															setEditors((prev) => {
																prev.delete('weapons');
																return new Set(prev);
															});
														}
													}}
													className="flex-grow"
													autoFocus
												/>
												<button
													className="text-red-500 p-2"
													onClick={() => handleDeleteWeapon(index)}
												>
													<TrashIcon width={24} />
												</button>
											</>
										) : (
											<p className="text-lg font-semibold">
												{weapon.name || `Weapon ${index + 1}`}
											</p>
										)}
									</div>
									{editors.has(`weapon.${index}`) ? (
										<div className="grid grid-cols-3 md:grid-cols-5 m-2">
											{fields
												.filter(
													(field) => field !== 'name' && field !== 'notes',
												)
												.map((field) => (
													<div
														className={classNames('p-2', {
															'col-span-1': ['type', 'range', 'mod'].includes(
																field,
															),
															'col-span-full': field === 'damage',
															'md:col-span-2': field === 'damage',
														})}
													>
														<input
															className="placeholder:capitalize text-center"
															key={field}
															type="text"
															value={weapon[field] || ''}
															placeholder={field}
															onChange={({ target: { value } }) =>
																handleFieldChange(index, field, value)
															}
															onKeyDown={(e) => {
																if (['Enter', 'Escape'].includes(e.key)) {
																	setEditors((prev) => {
																		prev.delete(`weapon.${index}`);
																		return new Set(prev);
																	});
																}
															}}
														/>
													</div>
												))}
											<div className="col-span-full p-2">
												<textarea
													value={weapon.notes || ''}
													placeholder="Notes"
													onChange={({ target: { value } }) =>
														handleFieldChange(index, 'notes', value)
													}
													onKeyDown={(e) => {
														if (
															['Escape'].includes(e.key) ||
															(['Enter'].includes(e.key) && e.shiftKey)
														) {
															setEditors((prev) => {
																prev.delete(`weapon.${index}`);
																return new Set(prev);
															});
														} else {
															const { style, scrollHeight } =
																e.target as HTMLTextAreaElement;
															style.height = `${scrollHeight}px`;
														}
													}}
													onFocus={(e) => {
														const { style, scrollHeight } =
															e.target as HTMLTextAreaElement;
														style.height = `${scrollHeight}px`;
													}}
													className="w-full"
													autoFocus
												/>
											</div>
										</div>
									) : (
										<div className="p-2">
											<button
												className="w-full p-2"
												onClick={() => {
													setEditors((prev) => {
														prev.add(`weapon.${index}`);
														return new Set(prev);
													});
												}}
											>
												<div className="grid grid-cols-3 md:grid-cols-5 m-2">
													{fields
														.filter(
															(field) => field !== 'name' && field !== 'notes',
														)
														.map((field) => (
															<div
																key={field}
																className={classNames(
																	'flex',
																	'flex-col',
																	'justify-end',
																	'text-center',
																	{
																		'col-span-1': [
																			'type',
																			'range',
																			'mod',
																		].includes(field),
																		'col-span-full': field === 'damage',
																		'md:col-span-2': field === 'damage',
																	},
																)}
															>
																<p>{weapon[field]}</p>
																<p className="text-xs text-(--grey) capitalize">
																	{field}
																</p>
															</div>
														))}
												</div>
												{weapon.notes && (
													<p className="bg-(--black-3) p-2 rounded-md text-left whitespace-pre-wrap">
														{weapon.notes}
													</p>
												)}
											</button>
										</div>
									)}
								</div>
							</div>
						))}
						{editors.has('weapons') && (
							<div className="flex flex-col gap-[1rem]">
								<button
									className="flex gap-2 size-fit p-2 border self-center"
									onClick={handleAddWeapon}
									autoFocus
								>
									<PlusCircleIcon width={24} />
									Add Weapon
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</section>
	);
};
