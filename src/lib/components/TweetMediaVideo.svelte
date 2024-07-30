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

	const mp4Video = getMp4Video(media);
	let timeout: any;
	let video: HTMLVideoElement;

	$effect(() => {
		clearTimeout(timeout);
	});

	function handlePlay() {
		if (timeout) {
			clearTimeout(timeout);
		}
		if (!isPlaying) {
			isPlaying = true;
		}
		if (ended) {
			ended = false;
		}
	}

	function handlePause() {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			if (isPlaying) {
				isPlaying = false;
			}
			timeout = null;
		}, 100);
	}

	function handleEnded() {
		ended = true;
	}

	function handleButtonClick() {
		playButton = false;
		isPlaying = true;
		video.play();
		video.focus();
	}
</script>

<video
	bind:this={video}
	class='image'
	controls={!playButton}
	muted
	onended={handleEnded}
	onpause={handlePause}
	onplay={handlePlay}
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
		onclick={handleButtonClick}
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
