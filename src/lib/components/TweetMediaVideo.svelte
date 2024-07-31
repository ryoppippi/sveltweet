<script lang='ts'>
	import type { EnrichedQuotedTweet, EnrichedTweet } from 'react-tweet';
	import type { MediaAnimatedGif, MediaVideo	} from 'react-tweet/api';
	import { getMediaUrl, getMp4Video } from 'react-tweet';

	type Props = {
		tweet: EnrichedTweet | EnrichedQuotedTweet;
		media: MediaAnimatedGif | MediaVideo;
	};
	const { tweet, media }: Props = $props();

	let playButton = $state(true);
	let isPlaying = $state(false);
	let ended = $state(false);
	let timeout = $state(0);

	const mp4Video = getMp4Video(media);
	let video: HTMLVideoElement;

	$effect(() => {
		return () => {
			clearTimeout(timeout);
		};
	});
</script>

<video
	bind:this={video}
	class='image'
	controls={!playButton}
	muted
	onended={() => {
		ended = true;
	}}
	onpause={() => {
		if (timeout > 0) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			if (isPlaying) {
				isPlaying = false;
			}
			timeout = 0;
		}, 100);
	}}
	onplay={() => {
		if (timeout > 0) {
			clearTimeout(timeout);
		}
		if (!isPlaying) {
			isPlaying = true;
		}
		if (ended) {
			ended = false;
		}
	}}
	poster={getMediaUrl(media, 'small')}
	preload='metadata'
	tabIndex={playButton ? -1 : 0}
>
	<source src={mp4Video.url} type={mp4Video.content_type} />
</video>

{#if playButton}
	<button
		class='videoButton'
		aria-label='View video on Twitter'
		onclick={() => {
			playButton = false;
			isPlaying = true;
			video.play();
			video.focus();
		}}
		type='button'
	>
		<svg class='videoButtonIcon' aria-hidden='true' viewBox='0 0 24 24'>
			<g>
				<path d='M21 12L4 2v20l17-10z' />
			</g>
		</svg>
	</button>
{/if}

{#if !isPlaying && !ended}
	<div class='watchOnTwitter'>
		<a class='anchor' href={tweet.url} rel='noopener noreferrer' target='_blank'>
			{playButton ? 'Watch on Twitter' : 'Continue watching on Twitter'}
		</a>
	</div>
{/if}

{#if ended}
	<a class='anchor viewReplies' href={tweet.url} rel='noopener noreferrer' target='_blank'>
		View replies
	</a>
{/if}
