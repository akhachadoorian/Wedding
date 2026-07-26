import { ReactNode } from "react";
import { COMPONENT_STATUS } from "@/app/componentStatus";

type ComponentGuardProps = {
    id: string;
    children: ReactNode;
    fallback?: ReactNode;
};

export default function ComponentGuard({ id, children, fallback = null }: ComponentGuardProps) {
    const status = COMPONENT_STATUS[id] ?? "live";
    const isProduction = process.env.NODE_ENV === "production";

    if (status === "in-progress" && isProduction) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
