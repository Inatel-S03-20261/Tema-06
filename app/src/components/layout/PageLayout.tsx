import type { ReactNode } from "react";

import BottomNav from "./BottomNav";
import Header from "./Header";

type PageLayoutProps = {
    title: string;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
};

const PageLayout = ({
    title,
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
                <div className={contentClassName}>{children}</div>
            </section>

            <BottomNav />
        </>
    );
};

export default PageLayout;
