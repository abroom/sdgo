import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { SectionUtils } from '../SectionUtils';
import type { CharacterSheet, CharacterSheetSectionProps } from '../types';

import { CoreStandardItem } from './CoreStandardItem';
import { CoreExperienceItem } from './CoreExperienceItem';

import './Core.css';

type CoreStandardItemKey = keyof Omit<
	CharacterSheet['core'],
	'name' | 'xp' | 'notes'
>;
const standardCoreLabelsByKey: {
	[key in CoreStandardItemKey]: string;
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
	const [isContentVisible, setIsContentVisible] = useState(true);
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
					className="h-[3em] my-[0.55em] mx-[1em] w-[calc(100%-2em)]"
					ref={nameRef}
					type="text"
					placeholder="Unnamed Crawler"
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
					className={classNames('w-full', { toggled: !isContentVisible })}
					onClick={() => setIsContentVisible((prev) => !prev)}
				>
					<h1>{characterSheet.core.name || 'Unnamed Crawler'}</h1>
				</button>
			)}
			{isContentVisible && (
				<>
					<SectionUtils
						notes={characterSheet.core.notes}
						handleNotesChange={({ target: { value } }) =>
							setCharacterSheet((prev) => ({
								...prev,
								core: {
									...prev.core,
									notes: value,
								},
							}))
						}
						isEditing={editors.size > 0}
						handleSettingsClick={() => {
							setEditors((prev) => {
								return prev.size
									? new Set()
									: new Set(
											Object.keys(characterSheet.core)
												.filter((key) => key !== 'xp')
												.concat('xp.current', 'xp.required'),
										);
							});
						}}
					/>
					<div className="values">
						{Object.entries(standardCoreLabelsByKey).map(([key, label]) => (
							<CoreStandardItem
								key={key}
								isEditing={editors.has(key)}
								label={label}
								value={characterSheet.core[key as CoreStandardItemKey]}
								handleChange={({ target: { value } }) =>
									setCharacterSheet((prev) => ({
										...prev,
										core: {
											...prev.core,
											[key as keyof typeof characterSheet.core]: value,
										},
									}))
								}
								startEditing={() =>
									setEditors((prev) => {
										prev.add(key);
										return new Set(prev);
									})
								}
								stopEditing={() =>
									setEditors((prev) => {
										prev.delete(key);
										return new Set(prev);
									})
								}
							/>
						))}
						<CoreExperienceItem
							current={{
								isEditing: editors.has('xp.current'),
								value: characterSheet.core.xp.current,
								handleChange: ({ target: { value } }) =>
									setCharacterSheet((prev) => ({
										...prev,
										core: {
											...prev.core,
											xp: {
												...prev.core.xp,
												current: value,
											},
										},
									})),
								startEditing: () =>
									setEditors((prev) => {
										prev.add('xp.current');
										return new Set(prev);
									}),
								stopEditing: () =>
									setEditors((prev) => {
										prev.delete('xp.current');
										return new Set(prev);
									}),
							}}
							required={{
								isEditing: editors.has('xp.required'),
								value: characterSheet.core.xp.required,
								handleChange: ({ target: { value } }) =>
									setCharacterSheet((prev) => ({
										...prev,
										core: {
											...prev.core,
											xp: {
												...prev.core.xp,
												required: value,
											},
										},
									})),
								startEditing: () =>
									setEditors((prev) => {
										prev.add('xp.required');
										return new Set(prev);
									}),
								stopEditing: () =>
									setEditors((prev) => {
										prev.delete('xp.required');
										return new Set(prev);
									}),
							}}
						/>
					</div>
				</>
			)}
		</section>
	);
};
