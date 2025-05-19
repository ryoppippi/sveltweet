import type { Tweet } from '$lib/api';
import { getTweet } from '$lib/api';
import { error } from '@sveltejs/kit';

const IDS = [
	'1808900954730942940', // tweet with a video
	'849813577770778624', // tweet with image and without quote
	'1629307668568633344', // default react-tweeet(including quote)
] as const satisfies string[];

// eslint-disable-next-line ts/explicit-function-return-type
export async function load() {
	const tweets: { id: string; tweet: Tweet }[] = [];
	try {
		for (const id of IDS) {
			const tweet = await getTweet(id);

			if (tweet == null) {
				return error(404, `Tweet not found ${id}`);
			}

			tweets.push({ id, tweet });
		}

		return { tweets };
	}
	catch {
		return error(500, 'Could not load tweet');
	}
}
