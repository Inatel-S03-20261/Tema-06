import type { ReactNode } from "react";

import BottomNav from "./BottomNav";
import Header from "./Header";

type PageLayoutProps = {
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
};

const PageLayout = ({
    title,
    subtitle,
    children,
    className = "",
    contentClassName = "",
}: PageLayoutProps) => {
    return (
        <>
            <Header />

            <section
                aria-label={title}
                className={`mx-5 min-h-screen pt-20 pb-24 md:mx-8 ${className}`.trim()}
            >
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="mt-3 text-xs font-bold uppercase tracking-widest text-sm text-gray-500">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className={contentClassName}>{children}</div>
            </section>

            <BottomNav />
        </>
    );
};

export default PageLayout;
