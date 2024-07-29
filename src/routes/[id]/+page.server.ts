import type { RequestEvent } from './$types';
import { getTweet } from '$lib/utils.server.js';

export async function load({ params }: RequestEvent) {
	const { id } = params;
	try {
		const tweet = await getTweet(id);

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
