import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PanelCardProps = ComponentPropsWithoutRef<"article"> & {
    children: ReactNode;
};

const PanelCard = ({ children, className = "", ...props }: PanelCardProps) => {
    const cardClassName =
        `rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${className}`.trim();

    return (
        <article className={cardClassName} {...props}>
            {children}
        </article>
    );
};

export default PanelCard;
