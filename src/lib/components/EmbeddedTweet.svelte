<script lang='ts'>
	import type { Tweet } from 'react-tweet/api';
	import type { EnrichedTweet } from 'react-tweet';
	import { enrichTweet } from 'react-tweet';
	import type { TwitterComponents } from '../types.js';
	import TweetContainer from './TweetContainer.svelte';
	import TweetHeader from './TweetHeader.svelte';
	import TweetInReplyTo from './TweetInReply.svelte';
	import TweetBody from './TweetBody.svelte';
	import TweetMedia from './TweetMedia.svelte';
	import TweetInfo from './TweetInfo.svelte';
	import TweetActions from './TweetActions.svelte';
	import TweetReplies from './TweetReplies.svelte';
	import { building, dev } from '$app/environment';
	// import QuotedTweet from './quoted-tweet/QuotedTweet.svelte';

	type Props = {
		tweet: Tweet;
		components?: TwitterComponents;
	};

	const { tweet, components }: Props = $props();

	if (dev || building) {
	// console.info(`using tweet ${JSON.stringify(tweet)}`);
	}

	let enrichedTweet = $state<EnrichedTweet>();
	try {
		enrichedTweet = enrichTweet(tweet);
	}
	catch {
	// console.log(e);
	}
</script>

{#if enrichedTweet != null}
	<TweetContainer>
		<TweetHeader {components} tweet={enrichedTweet} />
		{#if enrichedTweet.in_reply_to_status_id_str}
			<TweetInReplyTo tweet={enrichedTweet} />
		{/if}
		<TweetBody tweet={enrichedTweet} />
		{#if enrichedTweet.mediaDetails?.length}
			<TweetMedia {components} tweet={enrichedTweet} />
		{/if}
		<!-- {#if enrichedTweet.quoted_tweet}
      <QuotedTweet {enrichedTweet.quoted_tweet} />
    {/if} -->
		<TweetInfo tweet={enrichedTweet} />
		<TweetActions tweet={enrichedTweet} />
		<TweetReplies tweet={enrichedTweet} />
	</TweetContainer>
{/if}
