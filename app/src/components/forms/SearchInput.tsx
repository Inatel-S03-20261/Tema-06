import FieldLabel from "./FieldLabel";

type SearchInputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
};

const SearchInput = ({
    label,
    value,
    onChange,
    placeholder,
    className = "",
}: SearchInputProps) => {
    return (
        <label className={`flex w-full max-w-md flex-col gap-1 ${className}`.trim()}>
            <FieldLabel>{label}</FieldLabel>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-100 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
            />
        </label>
    );
};

export default SearchInput;
