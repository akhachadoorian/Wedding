import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useLenis } from 'lenis/react';

export default function ScrollToHash() {
    const { hash, pathname } = useLocation();
    const lenis = useLenis();
    // const isMounted = useRef(false);



    useEffect(() => {
        // if (!isMounted.current) {
        //     isMounted.current = true;
        //     return;
        // }

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
