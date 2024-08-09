<script lang='ts'>
	import type { EnrichedTweet } from '$rt/utils.js';
	import { formatDate } from '$rt/date-utils.js';

	const { tweet }: { tweet: EnrichedTweet } = $props();

	const createdAt = new Date(tweet.created_at);
</script>

{#if createdAt != null}
	{@const formattedCreatedAtDate = formatDate(createdAt)}
	<a
		class='root'
		aria-label={formattedCreatedAtDate}
		href={tweet.url}
		rel='noopener noreferrer'
		target='_blank'
	>
		<time dateTime={createdAt.toISOString()}>{formattedCreatedAtDate}</time>
	</a>
{/if}

<style>
	@import "$rt_tw/tweet-info-created-at.module.css" scoped;
</style>
