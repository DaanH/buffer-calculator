import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import createAssetPath from "./utils/createAssetPath";

import NavContextProvider from "./hooks/useNav";

declare global {
    interface ImportMeta {
        env: {
            VITE_WEB_APP_ID: string;
            MODE: string;
            DEV: boolean;
        };
    }
}

const { VITE_WEB_APP_ID, MODE, DEV } = import.meta.env;

/* eslint-disable react/no-multi-comp */

const DevStyles = ({ webAppId }: { webAppId: string }) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!container) {
            return;
        }

        const sourceStylesContainer = document.head;

        const tagIdComment = `/* ${webAppId} */`;

        const moveStyles = () => {
            container.innerHTML = "";
            container.append(
                ...Array.from(sourceStylesContainer.children)
                    .filter((x) => x instanceof HTMLStyleElement)
                    .filter((x) => x.textContent?.includes(tagIdComment))
                    .map((x) => x.cloneNode(true))
            );
        };

        const observer = new MutationObserver(moveStyles);
        observer.observe(sourceStylesContainer, {
            characterData: true,
            childList: true,
            subtree: true
        });
        moveStyles();
        return () => {
            observer.disconnect();
        };
    }, [container, webAppId]);

    return <div ref={setContainer} />;
};

const getAssetsFromManifest = async () => {
    const response = await fetch(createAssetPath("/manifest.json"));
    if (!response.ok) {
        throw new Error("Failed to get manifest");
    }
    const manifest = await response.json();
    return {
        cssUrls: manifest["index.html"].css
    };
};

const ProdStyles = () => {
    const [cssUrls, setCssUrls] = useState<string[] | null>(null);

    useEffect(() => {
        if (MODE !== "cms") {
            getAssetsFromManifest().then((assets) => {
                setCssUrls(assets.cssUrls);
            });
        }
    }, []);

    return (
        <>
            {cssUrls?.map((url, index) => (
                <link type="text/css" rel="stylesheet" href={createAssetPath(url)} key={index} />
            ))}
        </>
    );
};

const Styles = () => (DEV ? <DevStyles webAppId={VITE_WEB_APP_ID} /> : <ProdStyles />);
const Root = () => {
    return (
        <NavContextProvider>
            <Styles />
            <App />
        </NavContextProvider>
    );
};

const container = document.getElementById(VITE_WEB_APP_ID);
container?.attachShadow({ mode: "open" });
const shadowRoot = container?.shadowRoot;

if (shadowRoot) {
    const root = createRoot(shadowRoot);
    root.render(<Root />);
}
