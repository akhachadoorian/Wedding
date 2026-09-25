import CopyOnly from '@/components/CopyOnly/CopyOnly';
import GothHero from '../GothHero/GothHero';
import Eyebrow from '@/components/Eyebrow/Eyebrow';
import Image from 'next/image';
import { WithHTMLProps } from '@/types/props';
import { cn } from '@/utils/cn';

// #region --- Coming Soon Header -----------------
type ComingSoonProps = {
    pageTitle?: string;
    header?: string;
    body?: string;
}

export default function ComingSoon({
    pageTitle,
    header,
    body
}:ComingSoonProps) {
    const headerText = header ? header : pageTitle ? `The ${pageTitle} page is coming soon!` : "This page is coming soon!";

    return (
            <section className="relative flex items-center justify-center min-h-dvh">
                <div className="img-holder absolute! z-1 w-full h-[calc(100dvh+var(--space-400))]">
                    <Image src={'/images/DipShot.jpg'} alt={"Max dipping Alex and kissing"} className="img-bw md:object-[center_20%]!" width={696} height={522} />
                    <div className="img-overlay bg-black-bg/80!"></div>
                </div>
    
                <div className="relative z-5 flex flex-col items-center text-center overflow-hidden pt-200 pb-400 px-col-margin md:max-w-container md:m-auto md:py-1500">
                    {pageTitle && <Eyebrow text={pageTitle} styleOptions={{variation: 'center', includeMargin: true}}/>}

                    <h1 className='w-full'>{headerText}</h1>
                    
                    {body && <p className='mt-300 body-l'>{body}</p>}
                </div>
            </section>
        );
}

// #endregion ---

// #region --- Coming Soon Section -----------------

type ComingSoonSectionThemes = 'cabernet' | 'gray' | 'black'

type ComingSoonSectionProps = WithHTMLProps & {
    eyebrow?: string;
    title: string;
    body?: string;
    theme?: ComingSoonSectionThemes
}

const THEME_MAP: Record<ComingSoonSectionThemes, string> = {
    cabernet: "bg-cabernet",
    gray: "bg-black",
    black: 'bg-black-bg'
}

export function ComingSoonSection({eyebrow, title, body, theme = 'cabernet', className}:ComingSoonSectionProps) {


    return (
        <section className={
            cn("text-center px-col-margin py-section-padding my-section-padding mx-auto", THEME_MAP[theme], className)}>
            <CopyOnly eyebrow={eyebrow} header={title} body={body} styleOptions={{variation: 'center', headingLevel: 'h2', headingClass: 'heading-l'}} />
        </section>
    )
}


// #endregion ---