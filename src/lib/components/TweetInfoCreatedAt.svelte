<script lang='ts'>
	import type { EnrichedTweet } from '$rt/utils.js';
	import { formatDate } from '$rt/date-utils.js';
	import s from '$rt_tw/tweet-info-created-at.module.css';

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
