<script lang='ts'>
	import type { Snippet } from 'svelte';
	import type { EnrichedQuotedTweet } from '$rt/utils.ts';
	import s from '$rt_qt/quoted-tweet-container.module.css';

	type Props = { tweet: EnrichedQuotedTweet; children: Snippet };

	const { tweet, children }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class={s.root}
	onclick={(e) => {
		e.preventDefault();
		window.open(tweet.url, '_blank');
	}}
>
	<article class={s.article}>
		{@render children()}
	</article>
</div>
