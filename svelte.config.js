import path from 'node:path';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { importCSSPreprocess } from '@ryoppippi/svelte-preprocess-import-css';
import { cssModules } from 'svelte-preprocess-cssmodules';

/** @param {...string} args */
function relativePath(...args) {
	return path.resolve(import.meta.dirname, ...args);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		importCSSPreprocess(),
		vitePreprocess(),
		cssModules({
			parseExternalStylesheet: true,
		}),
	],

	compilerOptions: {
		runes: true,
	},

	vitePlugin: {
		inspector: false,
	},

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		alias: {
			$rt: relativePath('./src/lib/react-tweet'),
			$rt_tw: relativePath('./src/lib/react-tweet/twitter-theme'),
			$rt_icons: relativePath('./src/lib/react-tweet/twitter-theme/icons'),
			$rt_qt: relativePath('./src/lib/react-tweet/twitter-theme/quoted-tweet'),
		},
	},
};

export default config;
