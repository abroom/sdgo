import PlusCircleIcon from '@heroicons/react/24/solid/PlusCircleIcon';
import clsx from 'clsx/lite';

export const AddItemButton = ({
	label,
	addItem,
}: {
	readonly label: string;
	readonly addItem: () => void;
}) => {
	return (
		<button
			className={clsx(
				'mb-2 col-span-full p-2',
				'flex items-center justify-around',
				'text-2xl font-bold',
			)}
			onClick={addItem}
		>
			<PlusCircleIcon width={36} />
			{label}
			<PlusCircleIcon width={36} />
		</button>
	);
};
