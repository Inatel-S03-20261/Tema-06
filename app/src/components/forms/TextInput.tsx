import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

import FieldLabel from "./FieldLabel";

type TextInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className"
> & {
    label: string;
    icon?: ReactNode;
    action?: ReactNode;
    error?: string;
};

const TextInput = ({
    label,
    icon,
    action,
    error,
    id,
    ...props
}: TextInputProps) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={inputId}>
                <FieldLabel>{label}</FieldLabel>
            </label>
            <span className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-gray-500">
                {icon}
                <input
                    id={inputId}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                    {...props}
                />
                {action}
            </span>
            {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default TextInput;
