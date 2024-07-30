<script lang='js'>
	import Tweet from '$lib/components/Tweet.svelte';

	const { data } = $props();
</script>

{#if data.tweet}
	<Tweet tweet={data.tweet} />
{:else if data.error}
	<p>{data.error}</p>
{/if}
