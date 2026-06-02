import type { InputHTMLAttributes } from "react";

type CheckboxInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className" | "type"
> & {
    label: string;
};

const CheckboxInput = ({ label, id, ...props }: CheckboxInputProps) => {
    return (
        <label
            htmlFor={id}
            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
        >
            <input
                id={id}
                type="checkbox"
                className="h-4 w-4 cursor-pointer accent-red-500"
                {...props}
            />
            {label}
        </label>
    );
};

export default CheckboxInput;
