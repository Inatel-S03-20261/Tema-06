import type { ReactNode } from "react";

type TooltipAlign = "start" | "end";
type TooltipPlacement = "top" | "bottom";

type TooltipProps = {
    content: string;
    label?: string;
    children?: ReactNode;
    align?: TooltipAlign;
    placement?: TooltipPlacement;
};

const alignClassNames: Record<TooltipAlign, string> = {
    start: "left-0",
    end: "right-0",
};

const placementClassNames: Record<TooltipPlacement, string> = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
};

const Tooltip = ({
    content,
    label = "?",
    children,
    align = "end",
    placement = "top",
}: TooltipProps) => {
    return (
        <span className="group relative inline-flex text-sm font-medium">
            {children ?? (
                <button
                    type="button"
                    aria-label={content}
                    className="h-6 w-6 cursor-help rounded-full bg-gray-100 text-xs font-bold text-gray-500 transition hover:text-red-500"
                >
                    {label}
                </button>
            )}
            <span
                className={`pointer-events-none absolute z-50 hidden w-max max-w-56 rounded-lg bg-gray-900 px-3 py-2 text-sm font-normal text-white shadow-lg group-hover:block group-focus-within:block ${alignClassNames[align]} ${placementClassNames[placement]}`}
            >
                {content}
            </span>
        </span>
    );
};

export default Tooltip;
