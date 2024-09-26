<script lang='ts'>
	import s from '../react-tweet/twitter-theme/tweet-info-created-at.module.css';
	import type { EnrichedTweet } from '$rt/utils.js';
	import { formatDate } from '$rt/date-utils.js';

	const { tweet }: { tweet: EnrichedTweet } = $props();

	const createdAt = new Date(tweet.created_at);
</script>

{#if createdAt != null}
	{@const formattedCreatedAtDate = formatDate(createdAt)}
	<a
		class={s.root}
		aria-label={formattedCreatedAtDate}
		href={tweet.url}
		rel='noopener noreferrer'
		target='_blank'
	>
		<time dateTime={createdAt.toISOString()}>{formattedCreatedAtDate}</time>
	</a>
{/if}
