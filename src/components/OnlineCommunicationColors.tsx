import { useEffect, useState } from "react";
import cx from "classnames";
import Color from "color";
import { usePapaParse } from "react-papaparse";
import createAssetPath from "../utils/createAssetPath";

import Loader from "./Loader";

const getTintColor = (color: string, type: string): string => {
    const factor = type === "lighter" ? 0.85 : 0.7;
    return Color(color).mix(Color("#fff"), factor).hex();
};

interface ColorObject {
    name: string;
    dutchName: string;
    hex: string;
}

interface ColorValuesItem {
    name: string;
    hex: string;
    rgb: string;
}

interface ColorValues {
    base: ColorValuesItem;
    tintOne: ColorValuesItem;
    tintTwo: ColorValuesItem;
}

const OnlineCommunicationColors = () => {
    const { readRemoteFile } = usePapaParse();
    const [colors, setColors] = useState<ColorValues[]>();
    const assetPath = createAssetPath("./roColors.csv");

    useEffect(() => {
        readRemoteFile(`${assetPath}`, {
            header: true,
            complete: (results) => {
                const data = results.data as ColorObject[];
                const colorValues = data.map((item) => {
                    const baseHex = item.hex;
                    const tintOneHex = getTintColor(baseHex, "light");
                    const tintTwoHex = getTintColor(baseHex, "lighter");
                    return {
                        base: {
                            name: item.dutchName,
                            hex: baseHex,
                            rgb: Color(baseHex).rgb().string()
                        },
                        tintOne: {
                            name: "Tint 1",
                            hex: tintOneHex,
                            rgb: Color(tintOneHex).rgb().string()
                        },
                        tintTwo: {
                            name: "Tint 2",
                            hex: tintTwoHex,
                            rgb: Color(tintTwoHex).rgb().string()
                        }
                    };
                });
                setColors(colorValues);
            },
            download: true
        });
    }, [readRemoteFile]);

    if (!colors) {
        return <Loader />;
    }

    return (
        <div className="rhs-color-overview">
            {colors.map(({ base, tintOne, tintTwo }, index) => {
                return (
                    <div className={cx("rhs-color", base.name)} key={index}>
                        <div className="rhs-color__swatches-container">
                            {[base.hex, tintOne.hex, tintTwo.hex].map((hex, hexIndex) => {
                                return (
                                    <div
                                        className="rhs-color__swatch"
                                        style={{
                                            backgroundColor: hex
                                        }}
                                        key={hexIndex}
                                    />
                                );
                            })}
                        </div>
                        <div className="rhs-color__info-container">
                            {[base, tintOne, tintTwo].map((tint, tintIndex) => {
                                return (
                                    <div className="rhs-color__info" key={tintIndex}>
                                        <span className="rhs-color__name">{tint.name}</span>
                                        <span className="rhs-color__values">
                                            <span className="rhs-color__hex-code">{tint.hex.toLowerCase()}</span>
                                            <span className="rhs-color__rgb-values">{tint.rgb}</span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OnlineCommunicationColors;
