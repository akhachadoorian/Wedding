import Navigation from "@/layout/Navigation";
import "@/styles/main.scss";
import "@/styles/tailwind.css";
import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import localFont from "next/font/local";
import {
    GlobalTooltip,
    TooltipProvider,
} from "../layout/GlobalTooltip";
import LenisProvider from "../utils/LenisProvider";
import PageTransitionProvider from "@/layout/PageTransition";
import Footer from "@/layout/Footer";
import { EVENT } from "@/content/event";

const { couple, wedding, venue } = EVENT;

export const metadata: Metadata = {
    title: `${couple.bride} & ${couple.groom} | ${wedding.date}, ${wedding.year}`,
    description: `Join us to celebrate the wedding of ${couple.bride} & ${couple.groom} on ${wedding.date}, ${wedding.year} at ${venue.name} in ${venue.city}.`,
};

const unbounded = Unbounded({
    subsets: ["latin"],
    variable: "--font-unbounded",
});

const respiraBlack = localFont({
    src: [
        {
            path: "../../public/fonts/Respira-Black.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/fonts/Respira-Black.woff",
            weight: "800",
            style: "normal",
        },
    ],
    variable: "--font-respira-black",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${unbounded.variable} ${respiraBlack.variable}`}
        >
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
                        <PageTransitionProvider>
                            <Navigation />

                            <main className="min-h-svh">{children}</main>

                            <Footer />
                        </PageTransitionProvider>
                    </LenisProvider>
                    <GlobalTooltip />
                </TooltipProvider>
            </body>
        </html>
    );
}
