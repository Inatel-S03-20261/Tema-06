import { Search } from "lucide-react";

import FieldLabel from "./FieldLabel";

type SearchInputProps = {
    label?: string;
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
        <label className={`flex w-full flex-col gap-1 ${className}`.trim()}>
            {label && <FieldLabel>{label}</FieldLabel>}

            <div className="relative">
                <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm font-medium text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                />
            </div>
        </label>
    );
};

export default SearchInput;