import { ReactNode } from "react";
import cx from "classnames";

import { useNav } from "../hooks/useNav";

type NavLinkProps = {
    page: string;
    className?: string;
    children: ReactNode;
};

const NavLink = ({ page, className, children }: NavLinkProps) => {
    const { setActivePage } = useNav();
    return (
        <a href="#0" onClick={() => setActivePage(page)} className={cx("nav-link", className)}>
            {children}
        </a>
    );
};
export default NavLink;
