<script lang='ts'>
	import type { Snippet } from 'svelte';
	import type { EnrichedQuotedTweet } from '$lib/utils.ts';

	type Props = { tweet: EnrichedQuotedTweet; children: Snippet };

	const { tweet, children }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class='root'
	onclick={(e) => {
		e.preventDefault();
		window.open(tweet.url, '_blank');
	}}
>
	<article class='article'>
		{@render children()}
	</article>
</div>

<style>
	@import "$rt_qt/quoted-tweet-container.module.css" scoped;
</style>
