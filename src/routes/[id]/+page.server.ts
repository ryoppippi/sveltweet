import { getTweet } from 'react-tweet/api';
import { error } from '@sveltejs/kit';
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
		return error(500, 'Could not load tweet');
	}
}
