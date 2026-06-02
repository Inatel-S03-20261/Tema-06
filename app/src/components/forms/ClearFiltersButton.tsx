import Button from "../ui/Button";
import FieldLabel from "./FieldLabel";
import Tooltip from "../ui/Tooltip";

type ClearFiltersButtonProps = {
    onClick: () => void;
    disabled?: boolean;
};

const ClearFiltersButton = ({
    onClick,
    disabled = false,
}: ClearFiltersButtonProps) => {
    return (
        <div className="flex w-fit flex-col gap-1">
            <FieldLabel className="invisible">Limpar</FieldLabel>
            <Tooltip content="Limpar filtros">
                <Button
                    type="button"
                    onClick={onClick}
                    disabled={disabled}
                    aria-label="Limpar filtros"
                    variant="clearFilter"
                >
                    X
                </Button>
            </Tooltip>
        </div>
    );
};

export default ClearFiltersButton;
