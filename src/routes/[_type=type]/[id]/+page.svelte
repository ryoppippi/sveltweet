<script lang='ts'>
	import ToggleDark from './ToggleDark.svelte';
	import {
		SvelteTweet,
		SvelteTweetNotFound,
		SvelteTweetSkeleton,
		type Tweet,
	} from '$lib';

	const { data } = $props();
	const { tweet, type } = data;

	let isDark = $state(false);
</script>

{#snippet renderTweet(tweet: Tweet | undefined)}
	{#if tweet != null}
		<SvelteTweet {tweet} />
	{:else}
		<SvelteTweetNotFound />
	{/if}
{/snippet}

<div id='container'>
	<ToggleDark bind:isDark />

	{#if type === 'sync'}
		{@render renderTweet(tweet as Awaited<typeof tweet>)}
	{:else}
		{#await tweet}
			<SvelteTweetSkeleton />
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
