import classNames from 'classnames';
import { useState } from 'react';
import {
	TrashIcon,
	PlusCircleIcon,
	CogIcon,
	ArrowDownOnSquareIcon,
	BoltIcon,
	BoltSlashIcon,
} from '@heroicons/react/24/solid';

import { SectionUtils } from '../SectionUtils';
import type { CharacterSheet, CharacterSheetSectionProps } from '../types';
import { useCallback } from 'react';

export const Spells = ({
	characterSheet: { spells },
	setCharacterSheet,
}: CharacterSheetSectionProps) => {
	const [isContentVisible, setIsContentVisible] = useState(
		spells.data.length > 0 || spells.notes.length > 0,
	);
	const [editors, setEditors] = useState<Set<string>>(new Set());

	const spellFields: (keyof Omit<
		CharacterSheet['spells']['data'][number]['spells'][number],
		'name' | 'forgotten' | 'effect' | 'notes'
	>)[] = ['range', 'duration', 'mod', 'dc'];

	const handleTierChange = useCallback(
		(index: number, tier: string) => {
			setCharacterSheet((prev) => {
				const updatedSpells = [...prev.spells.data];
				updatedSpells[index] = { ...updatedSpells[index], tier };
				return { ...prev, spells: { ...prev.spells, data: updatedSpells } };
			});
		},
		[setCharacterSheet],
	);

	const handleAddTier = useCallback(() => {
		setCharacterSheet((prev) => ({
			...prev,
			spells: {
				...prev.spells,
				data: [...prev.spells.data, { tier: '', spells: [], notes: '' }],
			},
		}));
	}, [setCharacterSheet]);

	const handleDeleteTier = useCallback(
		(index: number) => {
			setCharacterSheet((prev) => ({
				...prev,
				spells: {
					...prev.spells,
					data: prev.spells.data.filter((_, i) => i !== index),
				},
			}));
		},
		[setCharacterSheet],
	);

	const handleAddSpell = useCallback(
		(tierIndex: number) => {
			setCharacterSheet((prev) => {
				const updatedSpells = prev.spells.data.map((tier, i) =>
					i === tierIndex
						? {
								...tier,
								spells: [
									...tier.spells,
									{
										name: '',
										forgotten: false,
										range: '',
										duration: '',
										mod: '',
										effect: '',
										dc: '',
										notes: '',
									},
								],
							}
						: tier,
				);
				return { ...prev, spells: { ...prev.spells, data: updatedSpells } };
			});
		},
		[setCharacterSheet],
	);

	const handleDeleteSpell = useCallback(
		(tierIndex: number, spellIndex: number) => {
			setCharacterSheet((prev) => {
				const updatedSpells = prev.spells.data.map((tier, i) =>
					i === tierIndex
						? {
								...tier,
								spells: tier.spells.filter((_, j) => j !== spellIndex),
							}
						: tier,
				);
				return {
					...prev,
					spells: {
						...prev.spells,
						data: updatedSpells,
					},
				};
			});
		},
		[setCharacterSheet],
	);

	const handleFieldChange = useCallback(
		(
			tierIndex: number,
			spellIndex: number,
			field: string,
			value: string | boolean,
		) => {
			setCharacterSheet((prev) => {
				const updatedSpells = [...prev.spells.data];
				updatedSpells[tierIndex].spells[spellIndex] = {
					...updatedSpells[tierIndex].spells[spellIndex],
					[field]: value,
				};
				return { ...prev, spells: { ...prev.spells, data: updatedSpells } };
			});
		},
		[setCharacterSheet],
	);

	return (
		<section className="spells">
			<button
				className={classNames('w-full', { toggled: !isContentVisible })}
				onClick={() => setIsContentVisible((prev) => !prev)}
			>
				<h2>Spells</h2>
			</button>
			{isContentVisible && (
				<>
					<SectionUtils
						notes={spells.notes}
						handleNotesChange={({ target: { value } }) =>
							setCharacterSheet((prev) => ({
								...prev,
								spells: { ...prev.spells, notes: value },
							}))
						}
						isEditing={editors.size > 0}
						handleSettingsClick={() => {
							setEditors((prev) => {
								return prev.size ? new Set() : new Set(['spells']);
							});
						}}
					/>
					<div className="tiers values flex flex-col gap-4">
						{spells.data.map(({ tier, spells, notes }, tierIndex) => (
							<div key={tierIndex} className="tier-item border rounded-[8px]">
								<div className="flex gap-2 items-center p-2">
									{editors.has(`spells`) ? (
										<>
											<input
												type="text"
												value={tier}
												placeholder="Tier name"
												onChange={({ target: { value } }) =>
													handleTierChange(tierIndex, value)
												}
												onKeyDown={(e) => {
													if (['Enter', 'Escape'].includes(e.key)) {
														setEditors((prev) => {
															prev.delete(`spells`);
															return new Set(prev);
														});
													}
												}}
												className="flex-grow m-2 mr-0"
												autoFocus
											/>
											<button
												className="text-red-500 p-2 mr-2"
												onClick={() => handleDeleteTier(tierIndex)}
											>
												<TrashIcon width={24} />
											</button>
										</>
									) : (
										<>
											<p className="flex-grow text-lg font-semibold ml-2">
												{tier}
											</p>
											<div className="flex gap-2 p-2">
												{editors.has(`tier.${tierIndex}`) ||
												spells.some((_, spellIndex) =>
													editors.has(`tier.${tierIndex}.${spellIndex}`),
												) ? (
													<button
														className="p-2"
														onClick={() => {
															setEditors((prev) => {
																prev.delete(`tier.${tierIndex}`);
																spells.forEach((_, spellIndex) => {
																	prev.delete(
																		`tier.${tierIndex}.${spellIndex}`,
																	);
																});
																return new Set(prev);
															});
														}}
													>
														<ArrowDownOnSquareIcon width={24} />
													</button>
												) : (
													<button
														className="p-2"
														onClick={() => {
															setEditors((prev) => {
																prev.add(`tier.${tierIndex}`);
																return new Set(prev);
															});
														}}
													>
														<CogIcon width={24} />
													</button>
												)}
											</div>
										</>
									)}
								</div>
								{editors.has(`tier.${tierIndex}`) ? (
									<div className="pt-2 px-4">
										<textarea
											value={notes}
											placeholder="Spell tier notes"
											onChange={({ target: { value } }) => {
												setCharacterSheet((prev) => {
													const updatedSpells = [...prev.spells.data];
													updatedSpells[tierIndex].notes = value;
													return {
														...prev,
														spells: { ...prev.spells, data: updatedSpells },
													};
												});
											}}
											onKeyDown={(e) => {
												if (
													['Escape'].includes(e.key) ||
													(['Enter'].includes(e.key) && e.shiftKey)
												) {
													setEditors((prev) => {
														prev.delete(`tier.${tierIndex}`);
														return new Set(prev);
													});
												}
											}}
											className="w-full h-[5rem] resize-none"
										/>
									</div>
								) : notes ? (
									<div className="p-2">
										<button
											className="w-full min-h-[4rem] p-[1rem] text-left bg-(--black-3)"
											onClick={() =>
												setEditors((prev) => {
													prev.add(`tier.${tierIndex}`);
													return new Set(prev);
												})
											}
										>
											<p className="whitespace-pre-wrap">
												{notes || (
													<i className="text-(--gray)">Click to edit</i>
												)}
											</p>
										</button>
									</div>
								) : null}
								{!editors.has('spells') && (
									<div className="spells-list values m-[1rem]">
										{spells.map((spell, spellIndex) => (
											<div
												key={spellIndex}
												className="spell-item border rounded-[8px] p-2"
											>
												{editors.has(`tier.${tierIndex}`) ? (
													<div className="flex items-center gap-2 p-2">
														<input
															type="text"
															value={spell.name}
															placeholder="Spell name"
															onChange={({ target: { value } }) =>
																handleFieldChange(
																	tierIndex,
																	spellIndex,
																	'name',
																	value,
																)
															}
															onKeyDown={(e) => {
																if (['Enter', 'Escape'].includes(e.key)) {
																	setEditors((prev) => {
																		prev.delete(`tier.${tierIndex}`);
																		return new Set(prev);
																	});
																}
															}}
															className="flex-grow"
														/>
														<button
															className="text-red-500 p-2"
															onClick={() =>
																handleDeleteSpell(tierIndex, spellIndex)
															}
														>
															<TrashIcon width={24} />
														</button>
													</div>
												) : (
													<>
														<div className="flex gap-2 items-center p-2">
															<button
																className="p-2 group"
																onClick={() => {
																	handleFieldChange(
																		tierIndex,
																		spellIndex,
																		'forgotten',
																		!spell.forgotten,
																	);
																}}
															>
																<BoltIcon
																	width={24}
																	className={classNames({
																		'text-yellow-200': !spell.forgotten,
																		'group-focus-visible:hidden':
																			!spell.forgotten,
																		'group-hover:hidden': !spell.forgotten,
																		hidden: spell.forgotten,
																		'text-purple-900': spell.forgotten,
																		'group-focus-visible:block':
																			spell.forgotten,
																		'group-hover:block': spell.forgotten,
																	})}
																/>
																<BoltSlashIcon
																	width={24}
																	className={classNames({
																		'text-yellow-200': !spell.forgotten,
																		'text-purple-900': spell.forgotten,
																		hidden: !spell.forgotten,
																		'group-focus-visible:block':
																			!spell.forgotten,
																		'group-hover:block': !spell.forgotten,
																		'group-focus-visible:hidden':
																			spell.forgotten,
																		'group-hover:hidden': spell.forgotten,
																	})}
																/>
															</button>

															<p className="flex-grow text-lg font-semibold">
																{spell.name}
															</p>
														</div>
														{spell.forgotten ? null : editors.has(
																`tier.${tierIndex}.${spellIndex}`,
														  ) ? (
															<div className="grid grid-cols-4 m-2 p-2 gap-2">
																{spellFields.map((field, i) => (
																	<input
																		key={field}
																		type="text"
																		value={spell[field]}
																		placeholder={field}
																		onChange={({ target: { value } }) =>
																			handleFieldChange(
																				tierIndex,
																				spellIndex,
																				field,
																				value,
																			)
																		}
																		onKeyDown={(e) => {
																			if (['Enter', 'Escape'].includes(e.key)) {
																				setEditors((prev) => {
																					prev.delete(
																						`tier.${tierIndex}.${spellIndex}`,
																					);
																					return new Set(prev);
																				});
																			}
																		}}
																		className={classNames('text-center', {
																			'col-span-1': [
																				'range',
																				'duration',
																				'dc',
																				'mod',
																			].includes(field),
																			'placeholder:capitalize': field !== 'dc',
																			'placeholder:uppercase': field === 'dc',
																		})}
																		autoFocus={i === 0}
																	/>
																))}
																<textarea
																	value={spell.effect}
																	placeholder="Effect"
																	onChange={({ target: { value } }) =>
																		handleFieldChange(
																			tierIndex,
																			spellIndex,
																			'effect',
																			value,
																		)
																	}
																	onKeyDown={(e) => {
																		if (
																			['Escape'].includes(e.key) ||
																			(['Enter'].includes(e.key) && e.shiftKey)
																		) {
																			setEditors((prev) => {
																				prev.delete(
																					`tier.${tierIndex}.${spellIndex}`,
																				);
																				return new Set(prev);
																			});
																		}
																	}}
																	className="w-full h-[5rem] resize-none col-span-full"
																/>
																<textarea
																	value={spell.notes}
																	placeholder="Notes"
																	onChange={({ target: { value } }) =>
																		handleFieldChange(
																			tierIndex,
																			spellIndex,
																			'notes',
																			value,
																		)
																	}
																	onKeyDown={(e) => {
																		if (
																			['Escape'].includes(e.key) ||
																			(['Enter'].includes(e.key) && e.shiftKey)
																		) {
																			setEditors((prev) => {
																				prev.delete(
																					`tier.${tierIndex}.${spellIndex}`,
																				);
																				return new Set(prev);
																			});
																		}
																	}}
																	className="w-full h-[5rem] resize-none col-span-full"
																/>
															</div>
														) : (
															<button
																className="w-full p-2"
																onClick={() => {
																	setEditors((prev) => {
																		prev.add(`tier.${tierIndex}.${spellIndex}`);
																		return new Set(prev);
																	});
																}}
															>
																<div className="grid grid-cols-4 gap-2 m-2">
																	{spellFields.map((field) => (
																		<div
																			key={field}
																			className={classNames(
																				'flex',
																				'flex-col',
																				'items-center',
																				'justify-end',
																				'p-2',
																				{
																					'col-span-1': [
																						'range',
																						'duration',
																						'dc',
																						'mod',
																					].includes(field),
																				},
																			)}
																		>
																			<span>{spell[field]}</span>
																			<span
																				className={classNames(
																					'text-xs',
																					'text-(--grey)',
																					{
																						capitalize: field !== 'dc',
																						uppercase: field === 'dc',
																					},
																				)}
																			>
																				{field}
																			</span>
																		</div>
																	))}
																	{spell.effect && (
																		<p className="col-span-full p-2 rounded-[8px] bg-(--black-3) text-left">
																			{spell.effect}
																		</p>
																	)}
																	{spell.notes && (
																		<p className="col-span-full p-2 rounded-[8px] bg-(--black-3) text-left">
																			{spell.notes}
																		</p>
																	)}
																</div>
															</button>
														)}
													</>
												)}
											</div>
										))}
										{editors.has(`tier.${tierIndex}`) && (
											<div className="flex flex-col gap-[1rem] p-2">
												<button
													className="flex gap-2 size-fit p-2 border self-center"
													onClick={() => handleAddSpell(tierIndex)}
													autoFocus
												>
													<PlusCircleIcon width={24} />
													Add Spell
												</button>
											</div>
										)}
									</div>
								)}
							</div>
						))}
						{editors.has('spells') && (
							<div className="flex justify-center gap-[1rem] p-2">
								<button
									className="flex gap-2 size-fit p-2 border self-center"
									onClick={handleAddTier}
									autoFocus
								>
									<PlusCircleIcon width={24} />
									Add Tier
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</section>
	);
};
