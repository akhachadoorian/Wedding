import { ColorVariables } from "@/types/colors";
import { WithHTMLProps } from "@/types/props";
import { cn } from "@/utils/cn";

interface StarProps extends WithHTMLProps{
    color?: ColorVariables;
    // size: 
}

export default function Star({color = '--wine-600', className}:StarProps) {
    return (
        <div className={cn("aspect-square", className)}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 0C12 6.5 6.5 12 0 12C6.5 12 12 17.5 12 24C12 17.5 17.5 12 24 12C17.5 12 12 6.5 12 0Z"
                    fill={`var(${color})`}
                ></path>
            </svg>
        </div>
    );
}