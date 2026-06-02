import FieldLabel from "./FieldLabel";

type SelectInputProps<T extends string> = {
    label: string;
    value: T;
    options: T[];
    onChange: (value: T) => void;
    className?: string;
};

const SelectInput = <T extends string>({
    label,
    value,
    options,
    onChange,
    className = "",
}: SelectInputProps<T>) => {
    return (
        <label className="flex w-full max-w-md flex-col gap-1">
            <FieldLabel>{label}</FieldLabel>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value as T)}
                className={`h-11 w-full rounded-lg border border-gray-200 bg-gray-100 px-4 text-sm text-gray-700 outline-none transition focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100 ${className}`.trim()}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SelectInput;
