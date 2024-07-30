<script lang='ts'>
	import { format } from 'date-fns';
	import type { TEnrichedTweet } from '../types.js';

	const { tweet }: { tweet: TEnrichedTweet } = $props();

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
