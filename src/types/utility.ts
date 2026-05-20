/**
 * Generic type to allow up to N elements (0 through N inclusive)
 * 
 * @description
 * The type checks if A's length equals N otherwise recursively calls the type again while including intermediate tuple in the return.
 * 
 * @template T - The element type
 * @template N - The maximum number of elements
 * @template A - Internal accumulator, do not pass this yourself
 * 
 * @example Type that has a maximum of 2 Button Settings
 * type ThreeButtonsArray = MaxX<ButtonSettingProps, 2>;
 */
export type MaxX<T, N extends number, A extends T[] = []> = A['length'] extends N ? A : A | MaxX<T, N, [...A, T]>;

/**
 * Generic type to allow up to N and not an empty array
 * 
 * @template T - The element type
 * @template N - The maximum number of elements
 * 
 * @example Type that requires at least 1 element but a maximum of 2
 * type ThreeButtonsArray = NonEmptyMaxX<ButtonSettingProps, 2>;
 */
export type NonEmptyMaxX<T, N extends number> = Exclude<MaxX<T, N>, []>;


/**
 * Generic type to set a min number of elements in an array to be 1
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Generic type to require exactly N elements
 * 
 * @description
 * The type checks if A's length equals N otherwise recursively call it again with another T element added to the tuple.
 * 
 * @template T - The element type
 * @template N - The required number of elements
 * @template A - Internal accumulator, do not pass this yourself
 * 
 * @example Type that requires two buttons
 * type Buttons = RequiredX<Button, 2>
 * 
 * @example Type that dynamically passes number
 * type StyleMap<N extends number> = RequireX<BtnStyles, N>;
 */
export type RequireX<T, N extends number, A extends T[] = []> = A["length"] extends N ? A : RequireX<T, N, [...A, T]>;


/**
 * Utility alignment type
 * 
 * @description
 * Allows the user to pass both the desktop and mobile alignment an item
 * 
 */
export type AlignmentProps = {
    desktop: 'center' | 'left' | 'right';
    mobile?: 'center' | 'left' | 'right';
}

// export type BreakpointProps = 'mobile' | 'tablet' | 'desktop' | 'large-desktop';
