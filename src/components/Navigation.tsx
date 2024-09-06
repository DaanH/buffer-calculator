import { Wayfinder } from "./WayFinder";

const wayFinderArgs = {
    ariaLabel: "Links naar meer informatie",
    className: "navigation",
    onGrayBackground: true,
    pages: [
        {
            href: "home",
            title: "Home"
        },
        {
            href: "externalData",
            title: "Externe data"
        },
        {
            href: "typography",
            title: "Typografie"
        },
        {
            href: "fontsAndIcons",
            title: "Fonts & iconen"
        }
    ]
};

const Navigation = () => {
    return <Wayfinder {...wayFinderArgs} />;
};
export default Navigation;
