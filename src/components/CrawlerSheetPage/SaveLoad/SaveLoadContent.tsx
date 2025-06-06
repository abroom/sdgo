import { SaveFile } from './SaveFile';
import { LoadFile } from './LoadFile';
import { LoadTemplate } from './LoadTemplate';

export const SaveLoadContent = () => {
	return (
		<div className="p-4 flex flex-col sm:flex-row gap-4 justify-center">
			<SaveFile />
			<LoadFile />
			<LoadTemplate />
		</div>
	);
};
