<script lang='ts'>
	import type { EnrichedQuotedTweet } from 'react-tweet';
	import type { Snippet } from 'svelte';

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
.root {
  width: 100%;
  overflow: hidden;
  border: var(--tweet-border);
  border-radius: 12px;
  margin: var(--tweet-quoted-container-margin);
  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  cursor: pointer;
}

.root:hover {
  background-color: var(--tweet-quoted-bg-color-hover);
}

.article {
  position: relative;
  box-sizing: inherit;
}
</style>
