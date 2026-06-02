import CopyOnly from '@/components/CopyOnly/CopyOnly';
import GothHero from '../GothHero/GothHero';
import './ComingSoon.scss'

export default function ComingSoon() {
    return (
            <div className={`coming_soon_wrapper`}>
                <GothHero loaded={true} img={{src: '/images/DipShot.jpg', alt: 'Max dipping Alex and kissing'}} />
                {/* <div className="img-holder coming_soon-img">
                    <img src={'/images/DipShot.jpg'} alt={"Max dipping Alex and kissing"} className="img-bw" />
                    <div className="img-overlay"></div>
                </div>
    
                <div className="coming_soon-text">
                    
                        <div className="coming_soon-text-eyebrow">
                          
                        </div>
                
    
                    <div className="coming_soon-text-title">
                        <h1>Alex</h1>
                        <p>&</p>
                        <h1>Max</h1>
                    </div>
                </div> */}

                <section className='coming_soon base_section'>
                    <CopyOnly 
                        header='Content and details coming soon!'
                        styleOptions={{
                            variation: 'center'
                        }}
                    />
                </section>
            </div>
        );
}