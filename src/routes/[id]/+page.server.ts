import { type Tweet, getTweet } from 'react-tweet/api';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const { id } = params;

	if (id === '') {
		return error(404, 'Tweet not found');
	}

	const tweet = await (getTweet(id));

	if (tweet == null) {
		return error(404, 'Tweet not found');
	}

	tweet satisfies Tweet;

	return { tweet };
}
