import type { Metadata } from "next";
import { Unbounded } from 'next/font/google';
import localFont from 'next/font/local';
import "@/styles/main.scss";
import LenisProvider from "../utils/LenisProvider";
import Footer from "../layout/Footer/Footer";
import Navigation from "../layout/Navigation/Navigation";
import { GlobalTooltip, TooltipProvider } from "../layout/GlobalTooltip/GlobalTooltip";
import Navigation2 from "@/layout/Navigation 2/Navigation2";
import ComingSoon from "@/layout/ComingSoon/ComingSoon";
import Footer2 from "@/layout/Footer2/Footer2";

export const metadata: Metadata = {
    title: "Alex & Max | October 31, 2026",
    description:
        "Join us to celebrate the wedding of Alex & Max on October 31st, 2026 at The Clay Theatre in Green Cove Springs, Florida.",
};


const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded' });

const respiraBlack = localFont({
    src: [
        { path: '../../public/fonts/Respira-Black.woff2' },
        { path: '../../public/fonts/Respira-Black.woff' },
    ],
    variable: '--font-respira-black',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${unbounded.variable} ${respiraBlack.variable}`}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/logo192.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#000000" />
            </head>
            <body>
                <TooltipProvider>
                    <LenisProvider>
                        {/* <Navigation /> */}
                        <Navigation2 />

                        <main>{children}</main>

                        {/* <Footer /> */}
                        <Footer2 />
                    </LenisProvider>
                    <GlobalTooltip />
                </TooltipProvider>
            </body>
        </html>
    );
}
