import ComingSoon from "@/layout/ComingSoon/ComingSoon";

import "./NotFound.scss";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow/Eyebrow";

export default function NotFound() {
    return (
        <section className="not_found">
            <div className="img-holder not_found-img">
                <Image
                    src={"/images/DipShot.jpg"}
                    alt={"Max dipping Alex and kissing"}
                    className="img-bw"
                    width={696}
                    height={522}
                />
                <div className="img-overlay"></div>
            </div>

            <div className="not_found-text">
                <Eyebrow
                    text={"page not found"}
                    styleOptions={{
                        variation: "center",
                        includeMargin: true,
                    }}
                />

                <h1 className="not_found-header">We Couldn't Find That Page</h1>

                <p className="not_found-body body-l">
                    The page you're looking for may have been moved or no longer
                    exists. Please head back to the homepage to find details
                    about our wedding, including the schedule, registry, and
                    travel information.
                </p>
            </div>
        </section>
    );
}
