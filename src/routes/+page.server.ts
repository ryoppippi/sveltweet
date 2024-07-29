import { getTweet } from '$lib/utils.server.js';

export const prerender = true;

export async function load() {
	try {
		const tweet = await getTweet('1694201062717034868');

		return {
			tweet,
		};
	}
	catch {
		return {
			status: 500,
			error: 'Could not load tweet',
		};
	}
}
