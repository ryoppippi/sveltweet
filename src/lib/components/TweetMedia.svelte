<script lang='ts'>
	import type { MediaDetails } from 'react-tweet/api';
	import { getMediaUrl } from 'react-tweet';
	import TweetMediaVideo from './TweetMediaVideo.svelte';
	import type { EnrichedQuotedTweet, EnrichedTweet } from '$lib/utils.js';

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

		return {
			width: media.type === 'photo' ? undefined : 'unset',
			paddingBottom: `${paddingBottom}%`,
		};
	};

	const length = tweet.mediaDetails?.length ?? 0;

	const mediaDetails = tweet.mediaDetails ?? [];
</script>

{#snippet skeletonDiv(params: Parameters<typeof getSkeletonStyle>)}
	{@const { width, paddingBottom } = getSkeletonStyle(...params)}
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div
		style:width={width}
		style:padding-bottom={paddingBottom}
		class='skeleton'
	/>
{/snippet}

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
					{@render skeletonDiv([media, length])}
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
					{@render skeletonDiv([media, length])}
					<TweetMediaVideo {media} {tweet} />
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	@import "$rt/tweet-media.module.css" scoped;
</style>
