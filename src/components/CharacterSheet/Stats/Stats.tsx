import { ArrowDownOnSquareIcon, CogIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useState } from 'react';

import { NotesItem } from '../NotesItem';
import type { CharacterSheetSectionProps } from '../types';

import './Stats.css';

export const Stats = ({
	characterSheet,
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
					<div className="flex justify-end mx-[1em]">
						<button
							className="w-[2em] p-[0.25em] rounded-sm"
							onClick={() => {
								console.log('clicked');
							}}
						>
							{editors.size ? <ArrowDownOnSquareIcon /> : <CogIcon />}
						</button>
					</div>
					<div className="values">
						<div className="stat-header">
							<span>Name</span>
							<span>Score</span>
							<span>Mod</span>
						</div>
						{characterSheet.stats.data.map((stat, index) => (
							<div key={index} className="stat">
								<span>
									<p className="text-2xl uppercase">
										{stat.name.substring(0, 3)}
									</p>
									<p className="text-sm">{stat.name}</p>
								</span>
								<span className="text-4xl">{stat.score}</span>
								<span className="text-4xl">{stat.mod}</span>
							</div>
						))}
						<NotesItem
							isEditing={editors.has('notes')}
							note={characterSheet.stats.notes}
							handleChange={({ target: { value } }) =>
								setCharacterSheet((prev) => ({
									...prev,
									stats: {
										...prev.stats,
										notes: value,
									},
								}))
							}
							startEditing={() =>
								setEditors((prev) => {
									prev.add('notes');
									return new Set(prev);
								})
							}
							stopEditing={() =>
								setEditors((prev) => {
									prev.delete('notes');
									return new Set(prev);
								})
							}
						/>
					</div>
				</>
			)}
		</section>
	);
};
