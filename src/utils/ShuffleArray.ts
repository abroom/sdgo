export const shuffleArray = <T>(array: T[]): T[] => {
	const shuffledArray = Array.from(array);

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = shuffledArray[i];
		shuffledArray[i] = shuffledArray[j];
		shuffledArray[j] = temp;
	}

	return shuffledArray;
};
