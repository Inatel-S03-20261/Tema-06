import type { ReactNode } from "react";

import PanelCard from "./PanelCard";

type DataTableProps = {
    title: ReactNode;
    countLabel: string;
    columns: ReactNode[];
    gridClassName: string;
    children: ReactNode;
    filters?: ReactNode;
};

const DataTable = ({
    title,
    countLabel,
    columns,
    gridClassName,
    children,
    filters,
}: DataTableProps) => {
    return (
        <PanelCard className="p-0">
            <div className="overflow-x-auto">
                <div className="min-w-max">
                    <div className="flex items-center justify-between py-1">
                        <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-gray-900">
                            {title}
                        </h2>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-bold text-gray-500">
                            {countLabel}
                        </span>
                    </div>

                    {filters && (
                        <div className="border-t border-gray-100 py-2">
                            <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                {filters}
                            </div>
                        </div>
                    )}

                    <div
                        className={`border-y border-gray-100 bg-gray-50 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-400 ${gridClassName}`}
                    >
                        {columns.map((column, index) => (
                            <span key={index}>{column}</span>
                        ))}
                    </div>

                    {children}
                </div>
            </div>
        </PanelCard>
    );
};

export default DataTable;
