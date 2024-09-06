import cx from "classnames";

import NavLink from "./NavLink";

type WayfinderItemProps = {
    title: string;
    href: string;
};

export type WayfinderProps = {
    ariaLabel?: string;
    pages: WayfinderItemProps[];
    className?: string;
    onGrayBackground?: boolean;
};

export const Wayfinder = ({ ariaLabel, pages, className, onGrayBackground }: WayfinderProps) => {
    return (
        <nav
            className={cx("wayfinder", className, onGrayBackground && "wayfinder--on-gray-background")}
            aria-label={ariaLabel}
        >
            {pages.map(({ title, href }, index) => {
                return (
                    <NavLink page={href} className="wayfinder__item" key={index}>
                        {title}
                    </NavLink>
                );
            })}
        </nav>
    );
};
