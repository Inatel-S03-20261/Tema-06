type FilterChipProps = {
    children: string;
    active?: boolean;
    onClick: () => void;
};

const FilterChip = ({ children, active = false, onClick }: FilterChipProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                active
                    ? "border-red-500 bg-red-500 text-white"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-200 hover:text-red-500"
            }`}
        >
            {children}
        </button>
    );
};

export default FilterChip;