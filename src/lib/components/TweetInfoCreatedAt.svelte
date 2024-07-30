<script lang='ts'>
	import type { EnrichedTweet } from 'react-tweet';
	import { format } from 'date-fns';

	const { tweet }: { tweet: EnrichedTweet } = $props();

	let createdAt = $state<Date>();

	$effect(() => {
		createdAt = new Date(tweet.created_at);
	});
</script>

{#if createdAt != null}
	<a
		class='root'
		aria-label={format(createdAt, 'h:mm a · MMM d, y')}
		href={tweet.url}
		rel='noopener noreferrer'
		target='_blank'
	>
		<time dateTime={createdAt.toISOString()}>
			{format(createdAt, 'h:mm a · MMM d, y')}
		</time>
	</a>
{/if}
