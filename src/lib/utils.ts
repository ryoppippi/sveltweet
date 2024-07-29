/*
    IMPORTANT NOTICE! -
    This code is originally taken from Vercel's 'react-tweet' package.
    It just has a bit of modifications to work on Svelte and suit my coding style.

    Package URL: https://github.com/vercel/react-tweet
*/

import type {
	IHashtagEntity,
	IMediaAnimatedGif,
	IMediaDetails,
	IMediaVideo,
	ISymbolEntity,
	ITweet,
	ITweetBase,
	TEnrichedTweet,
	TEntity,
	TEntityWithType,
	TTweetEntity,
} from './types.js';

function getTweetUrl(tweet: ITweetBase) {
	return `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
}

function getUserUrl(usernameOrTweet: string | ITweetBase) {
	return `https://twitter.com/${
		typeof usernameOrTweet === 'string' ? usernameOrTweet : usernameOrTweet.user.screen_name
	}`;
}

function getLikeUrl(tweet: ITweetBase) {
	return `https://twitter.com/intent/like?tweet_id=${tweet.id_str}`;
}

function getReplyUrl(tweet: ITweetBase) {
	return `https://twitter.com/intent/tweet?in_reply_to=${tweet.id_str}`;
}

function getFollowUrl(tweet: ITweetBase) {
	return `https://twitter.com/intent/follow?screen_name=${tweet.user.screen_name}`;
}

const getHashtagUrl = (hashtag: IHashtagEntity) => `https://twitter.com/hashtag/${hashtag.text}`;

const getSymbolUrl = (symbol: ISymbolEntity) => `https://twitter.com/search?q=%24${symbol.text}`;

function getInReplyToUrl(tweet: ITweet) {
	return `https://twitter.com/${tweet.in_reply_to_screen_name}/status/${tweet.in_reply_to_status_id_str}`;
}

export function getMediaUrl(media: IMediaDetails, size: 'small' | 'medium' | 'large'): string {
	const url = new URL(media.media_url_https);
	const extension = url.pathname.split('.').pop();

	if (extension == null) {
		return media.media_url_https;
	}

	url.pathname = url.pathname.replace(`.${extension}`, '');
	url.searchParams.set('format', extension);
	url.searchParams.set('name', size);

	return url.toString();
}

export function getMp4Videos(media: IMediaAnimatedGif | IMediaVideo) {
	const { variants } = media.video_info;
	const sortedMp4Videos = variants
		.filter(vid => vid.content_type === 'video/mp4')
		.sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0));

	return sortedMp4Videos;
}

export function getMp4Video(media: IMediaAnimatedGif | IMediaVideo) {
	const mp4Videos = getMp4Videos(media);
	// Skip the highest quality video and use the next quality
	return mp4Videos.length > 1 ? mp4Videos[1] : mp4Videos[0];
}

export function formatNumber(n: number): string {
	if (n > 999999) {
		return `${(n / 1000000).toFixed(1)}M`;
	}
	if (n > 999) {
		return `${(n / 1000).toFixed(1)}K`;
	}
	return n.toString();
}

function getEntities(tweet: ITweetBase): TEntity[] {
	const textMap = Array.from(tweet.text);
	const result: TEntityWithType[] = [{ indices: tweet.display_text_range, type: 'text' }];

	addEntities(result, 'hashtag', tweet.entities.hashtags);
	addEntities(result, 'mention', tweet.entities.user_mentions);
	addEntities(result, 'url', tweet.entities.urls);
	addEntities(result, 'symbol', tweet.entities.symbols);
	if (tweet.entities.media) {
		addEntities(result, 'media', tweet.entities.media);
	}
	fixRange(tweet, result);

	return result.map((entity) => {
		const text = textMap.slice(entity.indices[0], entity.indices[1]).join('');
		switch (entity.type) {
			case 'hashtag':
				return Object.assign(entity, { href: getHashtagUrl(entity), text });
			case 'mention':
				return Object.assign(entity, {
					href: getUserUrl(entity.screen_name),
					text,
				});
			case 'url':
			case 'media':
				return Object.assign(entity, {
					href: entity.expanded_url,
					text: entity.display_url,
				});
			case 'symbol':
				return Object.assign(entity, { href: getSymbolUrl(entity), text });
			default:
				return Object.assign(entity, { text });
		}
	});
}

function addEntities(result: TEntityWithType[],	type: TEntityWithType['type'],	entities: TTweetEntity[]) {
	for (const entity of entities) {
		for (const [i, item] of result.entries()) {
			if (item.indices[0] > entity.indices[0] || item.indices[1] < entity.indices[1]) {
				continue;
			}

			const items = [{ ...entity, type }] as TEntityWithType[];

			if (item.indices[0] < entity.indices[0]) {
				items.unshift({
					indices: [item.indices[0], entity.indices[0]],
					type: 'text',
				});
			}
			if (item.indices[1] > entity.indices[1]) {
				items.push({
					indices: [entity.indices[1], item.indices[1]],
					type: 'text',
				});
			}

			result.splice(i, 1, ...items);
			break; // Break out of the loop to avoid iterating over the new items
		}
	}
}

/**
 * Update display_text_range to work w/ Array.from
 * Array.from is unicode aware, unlike string.slice()
 */
function fixRange(tweet: ITweetBase, entities: TEntityWithType[]) {
	if (tweet.entities.media && tweet.entities.media[0].indices[0] < tweet.display_text_range[1]) {
		tweet.display_text_range[1] = tweet.entities.media[0].indices[0];
	}
	const lastEntity = entities.at(-1);
	if (lastEntity && lastEntity.indices[1] > tweet.display_text_range[1]) {
		lastEntity.indices[1] = tweet.display_text_range[1];
	}
}

/**
 * Enriches a tweet with additional data used to more easily use the tweet in a UI.
 */
export function enrichTweet(tweet: ITweet): TEnrichedTweet {
	if (tweet == null) {
		throw new Error(
			`Tweet not defined, please use a valid tweet, the tweet you used is ${JSON.stringify(tweet)}`,
		);
	}

	return {
		...tweet,
		url: getTweetUrl(tweet),
		user: {
			...tweet.user,
			url: getUserUrl(tweet),
			follow_url: getFollowUrl(tweet),
		},
		like_url: getLikeUrl(tweet),
		reply_url: getReplyUrl(tweet),
		in_reply_to_url: tweet.in_reply_to_screen_name != null ? getInReplyToUrl(tweet) : undefined,
		entities: getEntities(tweet),
		quoted_tweet: tweet.quoted_tweet
			? {
					...tweet.quoted_tweet,
					url: getTweetUrl(tweet.quoted_tweet),
					entities: getEntities(tweet.quoted_tweet),
				}
			: undefined,
	};
}
