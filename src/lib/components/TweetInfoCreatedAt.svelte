<script lang='ts'>
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	import type { TEnrichedTweet } from '../types.js';

	export let tweet: TEnrichedTweet;

	let createdAt: Date | null = null;

	onMount(() => {
		if (typeof window !== 'undefined') {
			createdAt = new Date(tweet.created_at);
		}
	});
</script>

{#if createdAt}
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
