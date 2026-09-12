'use client';

import { useCursor } from "@/hooks/useCursor";

export default function CustomCursor() {
    useCursor();

    return (
        <div className="cursor" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                <path d="M7 11C8.625 11 10 17.2333 10 22C10 17.2333 11.375 11 13 11H7Z" fill="#8E202E" />
                <path d="M0 10C5.41667 10 10 10 10 10C10 10 14.5833 10 20 10C14.5833 10 10 5.41667 10 0C10 5.41667 5.41667 10 0 10Z" fill="#8E202E" />
            </svg>
        </div>
    );
}
