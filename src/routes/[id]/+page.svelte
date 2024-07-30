<script lang='js'>
	import Tweet from '$components/Tweet.svelte';

	const { data } = $props();

	let isDark = $state(false);
</script>

<div>
	<input id='dark-mode' type='checkbox' bind:checked={isDark} />
	<label for='dark-mode'>Dark mode</label>
</div>

<div data-theme={isDark ? 'dark' : 'light'}>
	<Tweet tweet={data.tweet} />
</div>
