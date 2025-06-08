import { useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx/lite';

import { shuffleArray } from '@/utils/ShuffleArray';

export const DiceRoller = ({
	visible,
	close,
}: {
	readonly visible: boolean;
	readonly close: () => void;
}) => {
	const [customDice, setCustomDice] = useState<number>(7);
	const [diceRolls, setDiceRolls] = useState<
		({
			readonly timestamp: Date;
			readonly sides: number;
			readonly result: number;
		} | null)[]
	>([]);

	const handleRoll = useCallback((sides: number) => {
		const result =
			shuffleArray(Array.from({ length: sides }, (_, i) => i + 1))[0] ?? 0;

		setDiceRolls((prev) => {
			const next = [...prev];
			const lastRoll = next[next.length - 1];

			if (lastRoll && lastRoll.timestamp < new Date(Date.now() - 5000)) {
				next.push(null);
			}
			next.push({ timestamp: new Date(), sides, result });

			return next;
		});
	}, []);

	const scrollToRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		scrollToRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest',
		});
	});

	return (
		<div
			className={clsx(
				visible ? 'fixed' : 'hidden',
				'inset-0 flex flex-col gap-4 sm:gap-8 p-4 sm:p-8 bg-(--color-primary)',
			)}
		>
			<div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-hidden">
				<div className="border border-(--color-primary-2) rounded-lg flex-grow max-h-50% p-4 bg-(--color-primary-2) overflow-auto overscroll-contain">
					<label>Dice Results</label>
					<div className="flex flex-col gap-2">
						{diceRolls.map((diceRoll, i) =>
							diceRoll ? (
								<div key={i}>
									<p className="grid grid-cols-4 gap-2">
										<i className="col-span-2">
											{diceRoll.timestamp.toLocaleTimeString()}
										</i>
										<b className="text-right">d{diceRoll.sides}</b>
										<span className="flex justify-end text-right">
											<span
												className={clsx(
													'rounded-sm min-h-6 min-w-6 flex items-center justify-center text-(--color-primary)',
													diceRoll.result === diceRoll.sides
														? 'bg-emerald-400'
														: diceRoll.result === 1
															? 'bg-red-500'
															: 'bg-(--color-secondary)',
												)}
											>
												{diceRoll.result}
											</span>
										</span>
									</p>
								</div>
							) : (
								<div key={i} className="h-10" />
							),
						)}
					</div>
					<div ref={scrollToRef} />
				</div>
				<div className="border border-(--color-primary-3) rounded-lg flex-grow max-h-50% p-2 grid grid-cols-2 gap-2 overflow-auto overscroll-contain">
					{[20, 2, 3, 4, 6, 8, 10, 12, 100].map((sides) => (
						<button
							key={sides}
							onClick={() => handleRoll(sides)}
							className={clsx(
								'w-full',
								sides === 20 && 'col-span-full text-3xl',
							)}
						>
							Roll d{sides}
						</button>
					))}
					<div className="col-span-full grid grid-cols-2 items-center gap-2">
						<div className="h-full flex flex-col">
							<label className="hidden sm:block text-xl" htmlFor="custom-dice">
								Custom
							</label>
							<input
								id="custom-dice"
								type="number"
								className="flex-grow h-0 w-full text-center sm:text-xl"
								value={customDice}
								onChange={(e) => setCustomDice(Number(e.target.value) || 6)}
							/>
						</div>
						<button className="h-full" onClick={() => handleRoll(customDice)}>
							Roll d{customDice}
						</button>
					</div>
				</div>
			</div>
			<div className="flex justify-center">
				<button
					className="border border-(--color-primary-3) w-full sm:w-100 rounded-md p-2"
					onClick={close}
				>
					Close
				</button>
			</div>
		</div>
	);
};
