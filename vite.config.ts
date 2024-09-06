import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import svgrPlugin from "vite-plugin-svgr";
import md from "vite-plugin-react-md";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return {
        plugins: [
            react(),
            createHtmlPlugin({
                inject: {
                    data: { MODE: mode }
                }
            }),
            svgrPlugin({
                svgrOptions: {
                    icon: true
                }
            }),
            md()
        ],
        build: {
            target: "esnext",
            manifest: true,
            rollupOptions: {
                output: {
                    manualChunks: undefined
                }
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    includePaths: ["src/styles", "src/pages", "src/components"]
                }
            }
        }
    };
});
