import { importCSSPreprocess } from '@ryoppippi/svelte-preprocess-import-css';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { cssModules } from 'svelte-preprocess-cssmodules';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: [
				importCSSPreprocess(),
				vitePreprocess(),
				cssModules({
					parseExternalStylesheet: true,
				}),
			],

			compilerOptions: {
				runes: true,
				experimental: {
					async: true,
				},
			},

			inspector: false,

			adapter: adapter(),

			experimental: {
				remoteFunctions: true,
			},
		}),
	],
});
