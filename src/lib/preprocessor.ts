import MagicString from 'magic-string';
import type { PreprocessorGroup } from 'svelte/compiler';
import { getTweet } from './react-tweet/api/get-tweet.js';

export type Options = {
	/**
	 * Replace Tweet with `getTweet` result
		* @default '__TWEET_'
	 * @example
	 * ```html
	 * __TWEET_12345 -> `{data}`
	 * ```
	 */

	prefix?: string;
};

/**
 * Replace Tweet with `getTweet` result
 * @param options
 */
export default function (options: Options = {}): PreprocessorGroup {
	const {
		prefix = '__TWEET_',
	} = options;

	return {
		async markup(o) {
			const { content, filename } = o;

			const s = new MagicString(content);

			const pattern = new RegExp(`${prefix}(\\d+)`, 'g');

			let match;
			// eslint-disable-next-line no-cond-assign
			while ((match = pattern.exec(content)) !== null) {
				const start = match.index;
				const end = start + match[0].length;
				const id = match[1];

				try {
					const tweet = await getTweet(id);
					s.overwrite(start, end, JSON.stringify(tweet));
				}
				catch (e) {
					console.error(`Failed to fetch tweet ${id} in ${filename}`);
				}
			}

			return {
				code: s.toString(),
				map: s.generateMap({ hires: true, source: filename }),
			};
		},
	};
}
