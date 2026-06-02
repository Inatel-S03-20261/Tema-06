import type { ReactNode } from "react";

type FieldLabelProps = {
    children: ReactNode;
    className?: string;
};

const FieldLabel = ({ children, className = "" }: FieldLabelProps) => {
    return (
        <span
            className={`text-xs font-semibold tracking-widest text-gray-500 ${className}`.trim()}
        >
            {children}
        </span>
    );
};

export default FieldLabel;
