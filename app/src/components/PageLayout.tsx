import type { ReactNode } from "react";

type PageLayoutProps = {
    title: string;
    children: ReactNode;
    className?: string;
};

const PageLayout = ({ title, children, className = "" }: PageLayoutProps) => {
    return (
        <section className={`pt-24 mx-8 md:mx-12 min-h-screen ${className}`.trim()}>
            <h1 className="text-4xl mb-6">{title}</h1>

            {children}
        </section>
    );
};

export default PageLayout;
