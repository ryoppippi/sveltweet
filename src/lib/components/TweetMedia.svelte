<script lang='ts'>
	import type { MediaDetails } from '$rt/api';
	import type { EnrichedQuotedTweet, EnrichedTweet } from '$rt/utils.js';
	import { getMediaUrl } from '$rt/utils.js';
	import s from '../react-tweet/twitter-theme/tweet-media.module.css';
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
		class={s.skeleton}
	/>
{/snippet}

<div class={[s.root, { rounded: !quoted }]}>
	<div
		class={[
			s.mediaWrapper,
			{
				[s.grid2Columns]: length > 1,
				[s.grid3]: length === 3,
				[s.grid2x2]: length > 4,
			},
		]}
	>
		{#each mediaDetails as media (media)}
			{#if media.type === 'photo'}
				<a
					class='{s.mediaContainer} {s.mediaLink}'
					href={tweet.url}
					rel='noopener noreferrer'
					target='_blank'
				>
					{@render skeletonDiv([media, length])}
					<img
						class={s.image}
						alt={media.ext_alt_text || 'Image'}
						draggable
						loading='lazy'
						src={getMediaUrl(media, 'small')}
					/>
				</a>
			{:else}
				<div class={s.mediaContainer}>
					{@render skeletonDiv([media, length])}
					<TweetMediaVideo {media} {tweet} />
				</div>
			{/if}
		{/each}
	</div>
</div>
