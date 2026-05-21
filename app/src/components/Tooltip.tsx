import type { ReactNode } from "react";

type TooltipProps = {
    content: string;
    label?: string;
    children?: ReactNode;
};

const Tooltip = ({ content, label = "?", children }: TooltipProps) => {
    return (
        <span className="relative group text-sm font-medium">
            {children ?? (
                <button
                    type="button"
                    aria-label={content}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-help"
                >
                    {label}
                </button>
            )}
            <span className="hidden group-hover:block group-focus-within:block absolute left-0 top-8 z-10 max-w-64 w-max rounded bg-gray-900 px-3 py-2 text-sm font-normal text-white">
                {content}
            </span>
        </span>
    );
};

export default Tooltip;
