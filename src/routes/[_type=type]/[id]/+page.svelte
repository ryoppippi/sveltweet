<script lang='ts'>
	import ToggleDark from '../../ToggleDark.svelte';
	import {
		Tweet,
		TweetNotFound,
		TweetSkeleton,
	} from '$lib';
	import type { Tweet as TweetType } from '$lib/api';

	const { data } = $props();
	const { tweet, type } = data;

	let isDark = $state(false);
</script>

{#snippet renderTweet(tweet: TweetType | undefined)}
	{#if tweet != null}
		<Tweet {tweet} />
	{:else}
		<TweetNotFound />
	{/if}
{/snippet}

<div id='container'>
	<ToggleDark bind:isDark />

	{#if type === 'sync'}
		{@render renderTweet(tweet as Awaited<typeof tweet>)}
	{:else}
		{#await tweet}
			<TweetSkeleton />
		{:then tweet}
			{@render renderTweet(tweet)}
		{/await}
	{/if}
</div>

<style>
	#container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>
