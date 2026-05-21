import type { ReactNode } from "react";

type PageSectionProps = {
    title: ReactNode;
    children: ReactNode;
};

const PageSection = ({ title, children }: PageSectionProps) => {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
                {title}
            </h2>
            {children}
        </section>
    );
};

export default PageSection;
