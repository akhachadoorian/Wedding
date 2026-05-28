'use client';

import Link, { type LinkProps } from "next/link";
import { useLenis } from "lenis/react";

type Props = LinkProps & { className?: string; onClick?: React.MouseEventHandler; children?: React.ReactNode; target?: string };

export function LenisLink({ onClick, ...props }: Props) {
  const lenis = useLenis();
  return (
    <Link
      {...props}
      onClick={(e) => {
        const hasHash = typeof props.href === 'string' && props.href.includes('#');
        if (!hasHash) lenis?.scrollTo(0, { immediate: true });
        onClick?.(e);
      }}
    />
  );
}
