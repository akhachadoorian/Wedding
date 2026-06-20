import CopyOnly from '@/components/CopyOnly/CopyOnly';
import GothHero from '../GothHero/GothHero';
import './ComingSoon.scss'
import Eyebrow from '@/components/Eyebrow/Eyebrow';
import Image from 'next/image';

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
            <section className={`coming_soon`}>
                <div className="img-holder coming_soon-img">
                    <Image src={'/images/DipShot.jpg'} alt={"Max dipping Alex and kissing"} className="img-bw" width={696} height={522} />
                    <div className="img-overlay"></div>
                </div>
    
                <div className="coming_soon-text">
                    {pageTitle && <Eyebrow text={pageTitle} styleOptions={{variation: 'center', includeMargin: true}}/>}

                    <h1 className='coming_soon-header'>{headerText}</h1>
                    
                    {body && <p className='coming_soon-body body-l'>{body}</p>}
                </div>
            </section>
        );
}