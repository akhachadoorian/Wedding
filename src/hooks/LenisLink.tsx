import { Link, LinkProps } from 'react-router-dom';
import { useLenis } from 'lenis/react';

export function LenisLink({ onClick, ...props }: LinkProps) {
    const lenis = useLenis();
    return (
        <Link
            {...props}
            onClick={(e) => {
                const hasHash = typeof props.to === 'string'
                    ? props.to.includes('#')
                    : !!(props.to as { hash?: string }).hash;
                if (!hasHash) lenis?.scrollTo(0, { immediate: true });
                onClick?.(e);
            }}
        />
    );
}
