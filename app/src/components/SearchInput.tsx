type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
};

const SearchInput = ({
    value,
    onChange,
    placeholder,
    className = "",
}: SearchInputProps) => {

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={`h-10 border border-gray-400 rounded py-2 pl-4 w-full max-w-md ${className}`.trim()}
        />
    );
};

export default SearchInput;
