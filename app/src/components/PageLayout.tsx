import type { ReactNode } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

type PageLayoutProps = {
    title: string;
    children: ReactNode;
    className?: string;
};

const PageLayout = ({ title, children, className = "" }: PageLayoutProps) => {
    return (
        <>
            <Header />

            <section
                className={`pt-20 pb-20 mx-8 md:mx-12 min-h-screen ${className}`.trim()}
            >
                <h1 style={{ fontSize: "24px" }} className="font-nunito font-bold mb-4 tracking-wide">
                    {title}
                </h1>

                {children}
            </section>

            <BottomNav />
        </>
    );
};

export default PageLayout;