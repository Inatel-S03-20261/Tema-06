import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon" | "clearFilter";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
};

const variantClassNames: Record<ButtonVariant, string> = {
    primary: "bg-red-500 text-white hover:bg-red-600",
    secondary: "border border-gray-200 bg-white text-gray-700 hover:text-red-500",
    ghost: "bg-transparent text-gray-500 hover:text-red-500",
    icon: "border border-gray-200 bg-white text-gray-500 hover:text-red-500",
    clearFilter:
        "h-11 w-11 border border-gray-200 bg-white p-0 text-gray-500 hover:text-red-500",
};

const Button = ({
    children,
    className = "",
    variant = "primary",
    ...props
}: ButtonProps) => {
    const buttonClassName =
        `inline-flex w-fit items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClassNames[variant]} ${className}`.trim();

    return (
        <button className={buttonClassName} {...props}>
            {children}
        </button>
    );
};

export default Button;
