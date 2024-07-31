<script lang='js'>
	import { delay } from '@std/async';
	import ToggleDark from '../../[id]/ToggleDark.svelte';
	import { SvelteTweet, SvelteTweetNotFound, SvelteTweetSkeleton } from '$lib';

	const { data } = $props();

	let isDark = $state(false);

	$effect(() => {
		const mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)');
		isDark = mediaQueryObj.matches;
	});

	$effect(() => {
		if (isDark) {
			window.document.body.classList.add('dark');
			window.document.body.dataset.theme = 'dark';
		}
		else {
			window.document.body.classList.remove('dark');
			window.document.body.dataset.theme = 'light';
		}
	});

	const delayedTweet = async () => {
		await delay(1500);
		return data.tweet;
	};
</script>

<div id='container'>
	<ToggleDark />

	{#await delayedTweet()}
		<SvelteTweetSkeleton />
	{:then tweet}
		{#if tweet != null}
			<SvelteTweet {tweet} />
		{:else}
			<SvelteTweetNotFound />
		{/if}
	{/await}
</div>

<style>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
