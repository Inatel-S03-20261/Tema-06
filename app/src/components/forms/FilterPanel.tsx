import type { ReactNode } from "react";

type FilterPanelProps = {
    children: ReactNode;
    className?: string;
};

const FilterPanel = ({ children, className = "" }: FilterPanelProps) => {
    return (
        <section
            className={`rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm ${className}`.trim()}
        >
            {children}
        </section>
    );
};

export default FilterPanel;