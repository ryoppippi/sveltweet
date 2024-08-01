<script lang='ts'>
	import type { EnrichedTweet } from 'react-tweet';
	import { formatNumber } from 'react-tweet';

	type Props = { tweet: EnrichedTweet };
	const { tweet }: Props = $props();

	const replyText
		= tweet.conversation_count === 0
			? 'Read more on X'
			: tweet.conversation_count === 1
			? `Read ${formatNumber(tweet.conversation_count)} reply`
			: `Read ${formatNumber(tweet.conversation_count)} replies`;
</script>

<div class='replies'>
	<a class='link' href={tweet.url} rel='noopener noreferrer' target='_blank'>
		<span class='text'>
			{replyText}
		</span>
	</a>
</div>

<style>
	@import "$rt/tweet-replies.module.css" scoped;
</style>
