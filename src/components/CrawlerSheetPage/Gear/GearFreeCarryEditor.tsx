import { TrashIcon } from '@heroicons/react/24/solid';

import type { CrawlerSheet, UpdateCrawlerSheet } from '@/types/CrawlerSheet';

import { AddItemButton } from '../AddItemButton';

export const GearFreeCarryEditor = ({
	freeCarry,
	updateCrawlerSheet,
}: {
	readonly freeCarry: CrawlerSheet['gear']['freeCarry'];
	readonly updateCrawlerSheet: UpdateCrawlerSheet;
}) => {
	return (
		<>
			{freeCarry.map((_, i) => (
				<div
					key={i}
					className="mb-2 p-2 flex gap-2 items-center justify-center"
				>
					<div className="h-[2.6rem] flex-grow flex flex-col items-center justify-center text-xl">
						<p>Free Carry Slot {i + 1}</p>
						<div className="flex gap-2 text-sm text-(--color-primary-3)">
							{!!freeCarry[i].name && <p>{freeCarry[i].name}</p>}
							{!!freeCarry[i].quantity && <p>({freeCarry[i].quantity})</p>}
							{!freeCarry[i].name && !freeCarry[i].quantity && (
								<p className="italic">Empty</p>
							)}
						</div>
					</div>
					<button
						className="border-red-950 outline-red-300 shadow-red-300 p-2 bg-red-950 text-red-500"
						onClick={() => {
							updateCrawlerSheet({
								gear: {
									freeCarry: freeCarry.filter((_, idx) => idx !== i),
								},
							});
						}}
					>
						<TrashIcon width={24} />
					</button>
				</div>
			))}
			<AddItemButton
				label="Add Free Carry Slot"
				addItem={() => {
					updateCrawlerSheet({
						gear: {
							freeCarry: [...freeCarry, { name: '', quantity: '' }],
						},
					});
				}}
			/>
		</>
	);
};
