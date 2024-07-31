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

	// svelte-ignore non_reactive_update
	let video: HTMLVideoElement;

	$effect(() => {
		return () => {
			clearTimeout(timeout);
		};
	});
</script>

<!-- current does not work @see https://github.com/sveltejs/kit/issues/11057 -->
{#if typeof window !== 'undefined'}
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
		preload='none'
		tabIndex={playButton ? -1 : 0}
	>
		<source src={mp4Video.url} type={mp4Video.content_type} />
	</video>
{/if}

{#if playButton}
	<button
		class='videoButton'
		aria-label='View video on X'
		onclick={() => {
			playButton = false;
			isPlaying = true;
			video.play();
			video.focus();
		}}
		type='button'
	>
		<svg
			class='videoButtonIcon'
			aria-hidden='true'
			viewBox='0 0 24 24'
		>
			<g>
				<path d='M21 12L4 2v20l17-10z' />
			</g>
		</svg>
	</button>
{/if}

{#if !isPlaying && !ended}
	<div class='watchOnTwitter'>
		<a
			class='anchor'
			href={tweet.url}
			rel='noopener noreferrer'
			target='_blank'
		>
			{playButton ? 'Watch on X' : 'Continue watching on X'}
		</a>
	</div>
{/if}

{#if ended}
	<a class='anchor viewReplies' href={tweet.url} rel='noopener noreferrer' target='_blank'>
		View replies
	</a>
{/if}

<style>
.anchor {
  display: flex;
  align-items: center;
  color: white;
  padding: 0 1rem;
  border: 1px solid transparent;
  border-radius: 9999px;
  font-weight: 700;
  transition: background-color 0.2s;
  cursor: pointer;
  user-select: none;
  outline-style: none;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.videoButton {
  position: relative;
  height: 67px;
  width: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--tweet-color-blue-primary);
  transition-property: background-color;
  transition-duration: 0.2s;
  border: 4px solid #fff;
  border-radius: 9999px;
  cursor: pointer;
}
.videoButton:hover,
.videoButton:focus-visible {
  background-color: var(--tweet-color-blue-primary-hover);
}
.videoButtonIcon {
  margin-left: 3px;
  width: calc(50% + 4px);
  height: calc(50% + 4px);
  max-width: 100%;
  color: #fff;
  fill: currentColor;
  user-select: none;
}
.watchOnTwitter {
  position: absolute;
  top: 12px;
  right: 8px;
}
.watchOnTwitter > a {
  min-width: 2rem;
  min-height: 2rem;
  font-size: 0.875rem;
  line-height: 1rem;
  backdrop-filter: blur(4px);
  background-color: rgba(15, 20, 25, 0.75);
}
.watchOnTwitter > a:hover {
  background-color: rgba(39, 44, 48, 0.75);
}
.viewReplies {
  position: relative;
  min-height: 2rem;
  background-color: var(--tweet-color-blue-primary);
  border-color: var(--tweet-color-blue-primary);
  font-size: 0.9375rem;
  line-height: 1.25rem;
}
.viewReplies:hover {
  background-color: var(--tweet-color-blue-primary-hover);
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
