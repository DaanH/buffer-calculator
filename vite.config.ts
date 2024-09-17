import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import svgrPlugin from "vite-plugin-svgr";
import markdownPlugin from "vite-plugin-react-md";

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
			markdownPlugin()
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
