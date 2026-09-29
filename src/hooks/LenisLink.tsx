'use client';

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

import { usePageTransition } from "@/layout/PageTransition";

type Props = LinkProps & { className?: string; onClick?: React.MouseEventHandler; children?: React.ReactNode; target?: string };

export function LenisLink({ onClick, ...props }: Props) {
  const lenis = useLenis();
  const pathname = usePathname();
  const transition = usePageTransition();

  return (
    <Link
      {...props}
      onClick={(e) => {
        onClick?.(e);

        const href = props.href;
        const isPlainClick = e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
        const isNewPage =
          typeof href === 'string' &&
          href.startsWith('/') &&
          new URL(href, window.location.href).pathname !== pathname;

        // Internal link to another page: play the curtain transition, which
        // handles the route change and scroll reset itself.
        if (transition && isNewPage && isPlainClick && !e.defaultPrevented && props.target !== '_blank') {
          e.preventDefault();
          transition.navigate(href);
          return;
        }

        const hasHash = typeof href === 'string' && href.includes('#');
        if (!hasHash) lenis?.scrollTo(0, { immediate: true });
      }}
    />
  );
}
