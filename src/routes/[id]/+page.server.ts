import { getTweet } from 'react-tweet/api';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const { id } = params;

	if (id === '') {
		return error(404, 'Tweet not found');
	}

	try {
		const tweet = await getTweet(id);

		return {
			tweet,
		};
	}
	catch {
		return error(500, 'Could not load tweet');
	}
}
