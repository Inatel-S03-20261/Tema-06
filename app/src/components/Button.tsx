import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

const Button = ({ children, className = "", ...props }: ButtonProps) => {
    const buttonClassName = `bg-indigo-500 text-white px-4 py-2 rounded w-fit ${className}`.trim();

    return (
        <button className={buttonClassName} {...props}>
            {children}
        </button>
    );
};

export default Button;
