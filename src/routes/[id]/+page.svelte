<script lang='js'>
	import Tweet from '$lib/components/Tweet.svelte';

	const { data } = $props();
</script>

<Tweet tweet={data.tweet} />
