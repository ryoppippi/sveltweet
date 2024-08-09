<script lang='ts'>
	import type { EnrichedQuotedTweet } from '$lib/utils.js';

	type Props = { tweet: EnrichedQuotedTweet };

	const { tweet }: Props = $props();
</script>

<p
	class='root'
	dir='auto'
	lang={tweet.lang}
>
	{#each tweet.entities as item (item.indices)}
		<span>{item.text}</span>
	{/each}
</p>

<style>
	@import "$rt_qt/quoted-tweet-body.module.css" scoped;
</style>
