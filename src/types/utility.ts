/**
 * Generic type to set a maximum number of elements in an array to be 3
 */
export type MaxThree<T> = [] | [T] | [T, T] | [T, T, T];

/**
 * Generic type to set a maximum number of elements in an array to be 3
 */
export type MaxTwo<T> = [] | [T] | [T, T];


/**
 * Generic type to set a min number of elements in an array to be 1
 */
export type NonEmptyArray<T> = [T, ...T[]];
