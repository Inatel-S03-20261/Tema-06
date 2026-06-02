import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type BadgeTone = "red" | "green" | "yellow" | "blue" | "gray";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
    children: ReactNode;
    tone?: BadgeTone;
};

const toneClassNames: Record<BadgeTone, string> = {
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-indigo-100 text-indigo-600",
    gray: "bg-gray-100 text-gray-600",
};

const Badge = ({
    children,
    tone = "gray",
    className = "",
    ...props
}: BadgeProps) => {
    const badgeClassName =
        `inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${toneClassNames[tone]} ${className}`.trim();

    return (
        <span className={badgeClassName} {...props}>
            {children}
        </span>
    );
};

export default Badge;
