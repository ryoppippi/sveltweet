import { getTweet } from 'react-tweet/api';
import type { RequestEvent } from './$types';

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
