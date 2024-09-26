<script lang='ts'>
	import type { EnrichedQuotedTweet } from '$rt/utils.js';
	import s from '$rt_qt/quoted-tweet-body.module.css';

	type Props = { tweet: EnrichedQuotedTweet };

	const { tweet }: Props = $props();
</script>

<p
	class={s.root}
	dir='auto'
	lang={tweet.lang}
>
	{#each tweet.entities as item (item.indices)}
		<span>{item.text}</span>
	{/each}
</p>
