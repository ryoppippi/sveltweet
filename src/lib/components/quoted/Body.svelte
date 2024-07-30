<script lang='ts'>
	import type { EnrichedQuotedTweet } from 'react-tweet';

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
.root {
  font-size: var(--tweet-quoted-body-font-size);
  font-weight: var(--tweet-quoted-body-font-weight);
  line-height: var(--tweet-quoted-body-line-height);
  margin: var(--tweet-quoted-body-margin);
  overflow-wrap: break-word;
  white-space: pre-wrap;
  padding: 0 0.75rem;
}
</style>
