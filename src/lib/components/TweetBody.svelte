<script lang='ts'>
	import s from '../react-tweet/twitter-theme/tweet-body.module.css';
	import TweetLink from './TweetLink.svelte';
	import type { EnrichedTweet } from '$rt/utils.js';

	const { tweet }: { tweet: EnrichedTweet } = $props();
</script>

<!-- eslint-disable svelte/no-at-html-tags -->

<p class={s.root}>
	{#each tweet.entities as item, i (i)}
		{#if item.type === 'hashtag' || item.type === 'mention' || item.type === 'url' || item.type === 'symbol'}
			<TweetLink href={item.href}>{item.text}</TweetLink>
		{:else if item.type !== 'media'}
			<span>{@html item.text}</span>
		{/if}
	{/each}
</p>
