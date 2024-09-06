import { FunctionComponent, SVGProps } from "react";
import startCase from "lodash/startCase";

interface IIcon {
    [key: string]: FunctionComponent<
        SVGProps<SVGSVGElement> & {
            title?: string | undefined;
        }
    >;
}

import * as icons from "../icons";

const iconsTyped: IIcon = icons;

const iconClassNames = [
    "bars",
    "calendar-alt",
    "caret-right",
    "chevron-right",
    "chevron-right-light",
    "download",
    "envelope",
    "external-link",
    "pause",
    "phone-alt",
    "play",
    "plus",
    "question",
    "search",
    "times"
];

const IconsOverview = () => {
    return (
        <div className="icons-overview">
            <div className="icons-overview__body">
                {iconClassNames.map((name, index) => {
                    const niceName = startCase(name);
                    const Icon = iconsTyped[niceName.replace(/ /g, "")];
                    return (
                        <div className="icon-swatch" key={index}>
                            <h2 className="icon__name">{niceName}</h2>
                            <div className="icon__container">
                                <Icon color="#01689b" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default IconsOverview;
