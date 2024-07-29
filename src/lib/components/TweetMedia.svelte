<script lang='ts'>
	import type { IMediaDetails, TEnrichedQuotedTweet, TEnrichedTweet, TwitterComponents } from '../types.js';
	import { getMediaUrl } from '../utils.js';
	import TweetMediaVideo from './TweetMediaVideo.svelte';
	import MediaImg from './MediaImg.svelte';

	export let tweet: TEnrichedTweet | TEnrichedQuotedTweet;
	export let components: TwitterComponents | undefined;
	export let quoted: boolean = false;

	const getSkeletonStyle = (media: IMediaDetails, itemCount: number) => {
		let paddingBottom = 56.25; // default of 16x9

		if (itemCount === 1) {
			paddingBottom = (100 / media.original_info.width) * media.original_info.height;
		}
		if (itemCount === 2) {
			paddingBottom = paddingBottom * 2;
		}

		// return {
		// 	width: media.type === 'photo' ? undefined : 'unset',
		// 	paddingBottom: `${paddingBottom}%`
		// };

		return `width: ${
			media.type === 'photo' ? undefined : 'unset'
		}; padding-bottom: ${paddingBottom}%;`;
	};

	const length = tweet.mediaDetails?.length ?? 0;
	const Img = components?.MediaImg ?? MediaImg;

	const mediaDetails = tweet.mediaDetails ?? [];
</script>

<div class={['root', !quoted && 'rounded'].join(' ')}>
	<div
		class={[
			'mediaWrapper',
			length > 1 && 'grid2Columns',
			length === 3 && 'grid3',
			length > 4 && 'grid2x2',
		].join(' ')}
	>
		{#each mediaDetails as media (media)}
			{#if media.type === 'photo'}
				<a
					class={['mediaContainer', 'mediaLink'].join(' ')}
					href={tweet.url}
					rel='noopener noreferrer'
					target='_blank'
				>
					<div style={getSkeletonStyle(media, length)} class='skeleton' />
					<Img alt={media.ext_alt_text || 'Image'} draggable src={getMediaUrl(media, 'small')} />
				</a>
			{:else}
				<div class='mediaContainer'>
					<div style={getSkeletonStyle(media, length)} class='skeleton' />
					<TweetMediaVideo {media} {tweet} />
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.root {
		margin-top: 0.75rem;
		overflow: hidden;
		position: relative;
	}
	.rounded {
		border: var(--tweet-border);
		border-radius: 12px;
	}
	.mediaWrapper {
		display: grid;
		grid-auto-rows: 1fr;
		gap: 2px;
		height: 100%;
		width: 100%;
	}
	.grid2Columns {
		grid-template-columns: repeat(2, 1fr);
	}
	.grid3 > a:first-child {
		grid-row: span 2;
	}
	.grid2x2 {
		grid-template-rows: repeat(2, 1fr);
	}
	.mediaContainer {
		position: relative;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mediaLink {
		text-decoration: none;
		outline-style: none;
	}
	.skeleton {
		padding-bottom: 56.25%;
		width: 100%;
		display: block;
	}
	.image {
		position: absolute;
		top: 0px;
		left: 0px;
		bottom: 0px;
		height: 100%;
		width: 100%;
		margin: 0;
		object-fit: cover;
		object-position: center;
	}
</style>
