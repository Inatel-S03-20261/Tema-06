import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type ActionLinkProps = {
    to: string;
    children: ReactNode;
    className?: string;
};

const ActionLink = ({ to, children, className = "" }: ActionLinkProps) => {
    const linkClassName = `bg-indigo-500 text-white px-4 py-2 rounded w-fit ${className}`.trim();

    return (
        <Link to={to} className={linkClassName}>
            {children}
        </Link>
    );
};

export default ActionLink;
