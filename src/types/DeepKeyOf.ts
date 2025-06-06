export type DeepKeyOf<T> = T extends readonly unknown[]
	? `${keyof T & number}` | `${keyof T & number}.${DeepKeyOf<T[number]>}`
	: T extends object
		? {
				[K in keyof T]: `${K & string}` | `${K & string}.${DeepKeyOf<T[K]>}`;
			}[keyof T]
		: never;
