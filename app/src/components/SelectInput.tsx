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
            <span className="text-sm text-gray-600">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value as T)}
                className={`h-10 border border-gray-400 rounded py-2 pl-4 w-full max-w-md ${className}`.trim()}
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
