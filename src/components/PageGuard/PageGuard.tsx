import { ReactNode } from "react";
import { PAGE_STATUS } from "@/app/pageStatus";
import ComingSoon from "@/layout/ComingSoon/ComingSoon";

type PageGuardProps = {
    route: string;
    children: ReactNode;
    fallback?: ReactNode;
};

export default function PageGuard({ route, children, fallback }: PageGuardProps) {
    const status = PAGE_STATUS[route] ?? "live";
    const isProduction = process.env.NODE_ENV === "production";

    if (status === "in-progress" && isProduction) {
        return <>{fallback ?? <ComingSoon />}</>;
    }

    return <>{children}</>;
}
