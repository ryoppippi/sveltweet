<script lang='ts'>
	import type { EnrichedTweet } from 'react-tweet';
	import TweetLink from './TweetLink.svelte';

	const { tweet }: { tweet: EnrichedTweet } = $props();
</script>

<!-- eslint-disable svelte/no-at-html-tags -->

<p class='root'>
	{#each tweet.entities as item, i (i)}
		{#if item.type === 'hashtag' || item.type === 'mention' || item.type === 'url' || item.type === 'symbol'}
			<TweetLink href={item.href}>{item.text}</TweetLink>
		{:else if item.type !== 'media'}
			<span>{@html item.text}</span>
		{/if}
	{/each}
</p>

<style>
	.root {
		font-size: var(--tweet-body-font-size);
		font-weight: var(--tweet-body-font-weight);
		line-height: var(--tweet-body-line-height);
		margin: var(--tweet-body-margin);
		overflow-wrap: break-word;
		white-space: pre-wrap;
	}
</style>
