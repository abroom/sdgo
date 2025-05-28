import { useEffect, useRef, useState } from 'react';
import { ArrowDownOnSquareIcon, CogIcon } from '@heroicons/react/24/solid';
import type { CharacterSheet, CharacterSheetSectionProps } from '../types';
import './Core.css';
import classNames from 'classnames';

const standardCoreLabelsByKey: {
	[key in keyof Omit<CharacterSheet['core'], 'name' | 'xp' | 'notes'>]: string;
} = {
	player: 'Player',
	class: 'Class',
	ancestry: 'Ancestry',
	background: 'Background',
	title: 'Title',
	alignment: 'Alignment',
	backstory: 'Backstory',
	deity: 'Deity',
	lvl: 'Level',
};

export const Core = ({
	characterSheet,
	setCharacterSheet,
}: CharacterSheetSectionProps) => {
	// TODO remove
	// characterSheet = {
	// 	...characterSheet,
	// 	core: {
	// 		player: characterSheet.core.player || 'Player Name',
	// 		name: characterSheet.core.name || 'Character Name',
	// 		class: characterSheet.core.class || 'Class',
	// 		ancestry: characterSheet.core.ancestry || 'Ancestry',
	// 		background: characterSheet.core.background || 'Background',
	// 		title: characterSheet.core.title || 'Title',
	// 		alignment: characterSheet.core.alignment || 'Alignment',
	// 		backstory: characterSheet.core.backstory || 'Backstory',
	// 		deity: characterSheet.core.deity || 'Deity',
	// 		lvl: characterSheet.core.lvl || '1',
	// 		// data: characterSheet.core.data,
	// 		data: [
	// 			{
	// 				name: 'egg',
	// 				lhs: '',
	// 				rhs: 'potato',
	// 			},
	// 			{
	// 				name: 'extra',
	// 				lhs: '3',
	// 				rhs: 'potato',
	// 			},
	// 		],
	// 		notes: characterSheet.core.notes || 'These are example notes',
	// 	},
	// };

	const [showValues, setShowValues] = useState(true);
	const [editors, setEditors] = useState<Set<string>>(new Set());
	const nameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (nameRef.current) {
			nameRef.current.focus();
		}
	}, [editors]);

	return (
		<section className="core">
			{editors.has('name') ? (
				<input
					className="h-[3em] my-[0.5em]"
					ref={nameRef}
					type="text"
					value={characterSheet.core.name}
					onChange={({ target: { value } }) =>
						setCharacterSheet((prev) => ({
							...prev,
							core: {
								...prev.core,
								name: value,
							},
						}))
					}
					onKeyDown={(e) => {
						if (['Enter', 'Escape'].includes(e.key)) {
							setEditors((prev) => {
								prev.delete('name');
								return new Set(prev);
							});
						}
					}}
				/>
			) : (
				<button
					className={classNames('w-full', { toggled: !showValues })}
					onClick={() => setShowValues((prev) => !prev)}
				>
					<h1>{characterSheet.core.name || 'Unnamed Crawler'}</h1>
				</button>
			)}
			{showValues && (
				<>
					<div className="flex justify-end">
						<button
							className="w-[2em] p-[0.25em] rounded-sm"
							onClick={() => {
								setEditors((prev) =>
									prev.size
										? new Set()
										: new Set(Object.keys(characterSheet.core)),
								);
								nameRef.current?.focus();
							}}
						>
							{editors.size ? <ArrowDownOnSquareIcon /> : <CogIcon />}
						</button>
					</div>
					<div className="values">
						{Object.entries(standardCoreLabelsByKey).map(([key, label]) => {
							if (
								characterSheet.core[key as keyof typeof characterSheet.core] ||
								editors.has(key)
							) {
								return (
									<div key={key}>
										<p>{label}</p>
										{editors.has(key) ? (
											<input
												type="text"
												value={
													characterSheet.core[
														key as keyof typeof characterSheet.core
													] as string
												}
												onChange={({ target: { value } }) =>
													setCharacterSheet((prev) => ({
														...prev,
														core: {
															...prev.core,
															[key as keyof typeof characterSheet.core]: value,
														},
													}))
												}
												onKeyDown={(e) => {
													if (['Enter', 'Escape'].includes(e.key)) {
														setEditors((prev) => {
															prev.delete(key);
															return prev;
														});
													}
												}}
												autoFocus
											/>
										) : (
											<button
												onClick={() =>
													setEditors((prev) => {
														prev.add(key);
														return prev;
													})
												}
											>
												<p>
													{
														characterSheet.core[
															key as keyof typeof characterSheet.core
														] as string
													}
												</p>
											</button>
										)}
									</div>
								);
							}
							return null;
						})}
						{characterSheet.core.xp.current ||
						characterSheet.core.xp.required ||
						editors.has('xp') ? (
							<div>
								<p>Experience</p>
								{editors.has('xp') ? (
									<div className="flex gap-2">
										<input
											type="text"
											value={characterSheet.core.xp.current}
											onChange={({ target: { value } }) =>
												setCharacterSheet((prev) => ({
													...prev,
													core: {
														...prev.core,
														xp: {
															...prev.core.xp,
															current: value,
														},
													},
												}))
											}
											onKeyDown={(e) => {
												if (['Enter', 'Escape'].includes(e.key)) {
													setEditors((prev) => {
														prev.delete('xp');
														return new Set(prev);
													});
												}
											}}
											autoFocus
										/>
										<span>/</span>
										<input
											type="text"
											value={characterSheet.core.xp.required}
											onChange={({ target: { value } }) =>
												setCharacterSheet((prev) => ({
													...prev,
													core: {
														...prev.core,
														xp: {
															...prev.core.xp,
															required: value,
														},
													},
												}))
											}
											onKeyDown={(e) => {
												if (['Enter', 'Escape'].includes(e.key)) {
													setEditors((prev) => {
														prev.delete('xp');
														return new Set(prev);
													});
												}
											}}
										/>
									</div>
								) : (
									<button
										onClick={() =>
											setEditors((prev) => {
												prev.add('xp');
												return new Set(prev);
											})
										}
									>
										<p>
											{characterSheet.core.xp.current} /{' '}
											{characterSheet.core.xp.required}
										</p>
									</button>
								)}
							</div>
						) : null}
						{characterSheet.core.notes || editors.has('notes') ? (
							<div>
								<p>Notes</p>
								{editors.has('notes') ? (
									<textarea
										value={characterSheet.core.notes}
										onChange={({ target: { value } }) =>
											setCharacterSheet((prev) => ({
												...prev,
												core: {
													...prev.core,
													notes: value,
												},
											}))
										}
										onKeyDown={(e) => {
											if (['Enter', 'Escape'].includes(e.key) && !e.shiftKey) {
												setEditors((prev) => {
													prev.delete('notes');
													return new Set(prev);
												});
											}
										}}
										autoFocus
									/>
								) : (
									<button
										onClick={() =>
											setEditors((prev) => {
												prev.add('notes');
												return new Set(prev);
											})
										}
									>
										<p className="whitespace-pre-wrap">
											{characterSheet.core.notes}
										</p>
									</button>
								)}
							</div>
						) : null}
					</div>
				</>
			)}
		</section>
	);
};
