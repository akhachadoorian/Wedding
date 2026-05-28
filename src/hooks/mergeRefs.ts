'use client';

/**
 * Merges multiple refs into a single callback ref, so one element can satisfy
 * multiple ref consumers (e.g. an animation ref and a forwarded ref from props).
 * 
 * Null and undefined entries are skipped, so passing an optional ref directly is safe.
 *
 * @example
 * const animRef = useRef<HTMLDivElement>(null);
 * <div ref={mergeRefs(animRef, forwardedRef)} />
 */
export default function mergeRefs<T>(...refs: (React.Ref<T> | null | undefined)[]) {
    return (node: T | null) => {
        refs.forEach(ref => {
            if (typeof ref === 'function') ref(node); // if callback ref, call it
            else if (ref) (ref as React.MutableRefObject<T | null>).current = node; // if object ref, set the current
        });
    };
}