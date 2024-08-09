<script lang='ts'>
	import TweetContainer from './TweetContainer.svelte';
	import TweetHeader from './TweetHeader.svelte';
	import TweetInReplyTo from './TweetInReply.svelte';
	import TweetBody from './TweetBody.svelte';
	import TweetMedia from './TweetMedia.svelte';
	import TweetInfo from './TweetInfo.svelte';
	import TweetActions from './TweetActions.svelte';
	import TweetReplies from './TweetReplies.svelte';
	import { QuotedTweet } from './quoted';
	import type { Tweet } from '$rt/api';
	import { enrichTweet } from '$rt/utils.js';

	type Props = {
		tweet: Tweet;
	};

	const { tweet }: Props = $props();

	const enrichedTweet = enrichTweet(tweet);
</script>

{#if enrichedTweet != null}
	<TweetContainer>
		<TweetHeader tweet={enrichedTweet} />

		{#if enrichedTweet.in_reply_to_status_id_str != null}
			<TweetInReplyTo tweet={enrichedTweet} />
		{/if}

		<TweetBody tweet={enrichedTweet} />

		{#if (enrichedTweet.mediaDetails ?? []).length > 0}
			<TweetMedia tweet={enrichedTweet} />
		{/if}

		{#if enrichedTweet.quoted_tweet != null}
			<QuotedTweet tweet={enrichedTweet.quoted_tweet} />
		{/if}

		<TweetInfo tweet={enrichedTweet} />
		<TweetActions tweet={enrichedTweet} />
		<TweetReplies tweet={enrichedTweet} />
	</TweetContainer>
{/if}
