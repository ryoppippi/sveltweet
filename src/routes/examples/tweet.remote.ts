import { prerender } from '$app/server';
import { getTweet as _getTweet } from '$lib/api';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';

export const getTweet = prerender(v.string(), async (id) => {
	const tweet = await _getTweet(id);

	if (tweet == null) {
		error(404, {
			message: `Tweet not found ${id}`,
		});
	}
	return tweet;
});
