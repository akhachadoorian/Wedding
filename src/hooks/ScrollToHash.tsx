'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useLenis } from 'lenis/react';

export default function ScrollToHash() {
    const pathname = usePathname();
    const lenis = useLenis();
    const [hash, setHash] = useState('');

    useEffect(() => {
        setHash(window.location.hash);
        const handleHashChange = () => setHash(window.location.hash);
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [pathname]);

    useEffect(() => {
        if (!hash) {
            if (lenis) {
                lenis.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo(0, 0);
            }
            return;
        }

        const id = hash.slice(1);

        requestAnimationFrame(() => {
            const el = document.getElementById(id);
            if (!el) return;

            if (lenis) {
                lenis.scrollTo(el, { offset: 0, duration: 1.2 });
            } else {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }, [hash, pathname, lenis]);

    return null;
}
