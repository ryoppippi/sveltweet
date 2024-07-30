/*
    IMPORTANT NOTICE! -
    This code is originally taken from Vercel's 'react-tweet' package.
    It just has a bit of modifications to work on Svelte and suit my coding style.

    Package URL: https://github.com/vercel/react-tweet
*/

import { TWEET_REGEX } from './constants.server.js';
import Tweet from './components/Tweet.svelte';
import type { ITweet } from './types.js';

const SYNDICATION_URL = 'https://cdn.syndication.twimg.com';

function getToken(id: string) {
	return ((Number(id) / 1e15) * Math.PI).toString(6 ** 2).replace(/(0+|\.)/g, '');
}

/**
 * Fetches a tweet from the Twitter syndication API.
 */
export async function getTweet(id: string,	fetchOptions?: RequestInit): Promise<ITweet | undefined> {
	console.info(`Getting tweet with id ${id}`);

	if (id.length > 40 || !TWEET_REGEX.test(id)) {
		throw new Error(`Invalid tweet id: ${id}`);
	}

	const url = new URL(`${SYNDICATION_URL}/tweet-result`);
	console.info(`URL: ${url}`);

	url.searchParams.set('id', id);
	url.searchParams.set('lang', 'en');
	url.searchParams.set(
		'features',
		[
			'tfw_timeline_list:',
			'tfw_follower_count_sunset:true',
			'tfw_tweet_edit_backend:on',
			'tfw_refsrc_session:on',
			'tfw_fosnr_soft_interventions_enabled:on',
			'tfw_show_birdwatch_pivots_enabled:on',
			'tfw_show_business_verified_badge:on',
			'tfw_duplicate_scribes_to_settings:on',
			'tfw_use_profile_image_shape_enabled:on',
			'tfw_show_blue_verified_badge:on',
			'tfw_legacy_timeline_sunset:true',
			'tfw_show_gov_verified_badge:on',
			'tfw_show_business_affiliate_badge:on',
			'tfw_tweet_edit_frontend:on',
		].join(';'),
	);
	url.searchParams.set('token', getToken(id));

	console.info(`URL with params: ${url}`);

	const res = await fetch(url.toString(), fetchOptions);

	const contentType = res?.headers.get('content-type');
	const isJson = contentType?.includes('application/json');
	const data = isJson ? await res.json() : undefined;

	console.info(`content type: ${contentType}`);
	console.info(`res data ${JSON.stringify(data)}`);

	if (!isJson) {
		console.info(`res text: ${await res?.text()}`);
	}

	if (res.ok) { return data; }
	if (res.status === 404) {
		console.error(`Getting tweet ${id} returned a status of ${404}`);
		return;
	}

	throw new Error(`Failed to fetch tweet ${id}: ${data?.errors?.[0]?.message ?? res.statusText}`);
}
