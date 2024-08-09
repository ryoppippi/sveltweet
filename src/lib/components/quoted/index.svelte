<script lang='ts'>
	import TweetMedia from '../TweetMedia.svelte';
	import QuotedTweetContainer from './Container.svelte';
	import QuotedTweetHeader from './Header.svelte';
	import QuotedTweetBody from './Body.svelte';
	import type { EnrichedQuotedTweet } from '$lib/utils.js';

	type Props = { tweet: EnrichedQuotedTweet };
	const { tweet }: Props = $props();
</script>

<QuotedTweetContainer {tweet}>
	<QuotedTweetHeader {tweet} />
	<QuotedTweetBody {tweet} />
	{#if (tweet.mediaDetails ?? []).length > 0}
		<TweetMedia quoted={true} {tweet} />
	{/if}
</QuotedTweetContainer>
