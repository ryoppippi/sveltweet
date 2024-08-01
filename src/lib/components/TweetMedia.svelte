<script lang='ts'>
	import type { EnrichedQuotedTweet, EnrichedTweet } from 'react-tweet';
	import type { MediaDetails } from 'react-tweet/api';
	import { getMediaUrl } from 'react-tweet';
	import TweetMediaVideo from './TweetMediaVideo.svelte';

	type Props = {
		tweet: EnrichedTweet | EnrichedQuotedTweet;
		quoted?: boolean;
	};

	const { tweet, quoted = false }: Props = $props();

	const getSkeletonStyle = (media: MediaDetails, itemCount: number) => {
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

	const mediaDetails = tweet.mediaDetails ?? [];
</script>

<div
	class='root'
	class:rounded={!quoted}
>
	<div
		class='mediaWrapper'
		class:grid2Columns={length > 1}
		class:grid2x2={length > 4}
		class:grid3={length === 3}
	>
		{#each mediaDetails as media (media)}
			{#if media.type === 'photo'}
				<a
					class='mediaContainer mediaLink'
					href={tweet.url}
					rel='noopener noreferrer'
					target='_blank'
				>
					<!-- svelte-ignore element_invalid_self_closing_tag -->
					<div style={getSkeletonStyle(media, length)} class='skeleton' />
					<img
						class='image'
						alt={media.ext_alt_text || 'Image'}
						draggable
						loading='lazy'
						src={getMediaUrl(media, 'small')}
					/>
				</a>
			{:else}
				<div class='mediaContainer'>
					<!-- svelte-ignore element_invalid_self_closing_tag -->
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
