// Define entries type.
export type Entries<T extends Record<string, unknown>> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];
