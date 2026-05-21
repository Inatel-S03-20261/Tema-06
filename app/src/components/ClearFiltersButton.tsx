import Button from "./Button";
import Tooltip from "./Tooltip";

type ClearFiltersButtonProps = {
    onClick: () => void;
    disabled?: boolean;
};

const ClearFiltersButton = ({
    onClick,
    disabled = false,
}: ClearFiltersButtonProps) => {
    return (
        <Tooltip content="Limpar filtros">
            <Button
                type="button"
                onClick={onClick}
                disabled={disabled}
                aria-label="Limpar filtros"
                className="h-10 w-10 border border-gray-400 bg-transparent! p-0 text-gray-700! disabled:opacity-50"
            >
                X
            </Button>
        </Tooltip>
    );
};

export default ClearFiltersButton;
