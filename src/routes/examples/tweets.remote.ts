import type { Tweet } from '$lib/api';
import { query } from '$app/server';
import { getTweet } from '$lib/api';

const IDS = [
	'1808900954730942940', // tweet with a video
	'849813577770778624', // tweet with image and without quote
	'1629307668568633344', // default react-tweeet(including quote)
] as const satisfies string[];

export const getExampleTweets = query(async () => {
	const tweets: { id: string; tweet: Tweet }[] = [];

	for (const id of IDS) {
		const tweet = await getTweet(id);

		if (tweet == null) {
			throw new Error(`Tweet not found ${id}`);
		}

		tweets.push({ id, tweet });
	}

	return tweets;
});
