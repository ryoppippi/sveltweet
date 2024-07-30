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
	.replies {
		padding: 0.25rem 0;
	}

	.link {
		text-decoration: none;
		color: var(--tweet-color-blue-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 32px;
		min-height: 32px;
		user-select: none;
		outline-style: none;
		transition-property: background-color;
		transition-duration: 0.2s;
		padding: 0 1rem;
		border: var(--tweet-border);
		border-radius: 9999px;
	}

	.link:hover {
		background-color: var(--tweet-color-blue-secondary-hover);
	}

	.text {
		font-weight: var(--tweet-replies-font-weight);
		font-size: var(--tweet-replies-font-size);
		line-height: var(--tweet-replies-line-height);
		overflow-wrap: break-word;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
