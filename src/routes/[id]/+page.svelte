<script lang='js'>
	import Tweet from '$components/Tweet.svelte';

	const { data } = $props();

	let isDark = $state(false);

	$effect(() => {
		if (isDark) {
			window.document.body.classList.add('dark');
		}
		else {
			window.document.body.classList.remove('dark');
		}
	});
</script>

<div id='container'>
	<div>
		<input id='dark-mode' type='checkbox' bind:checked={isDark} />
		<label for='dark-mode'>Dark mode</label>
	</div>

	<div data-theme={isDark ? 'dark' : 'light'}>
		<Tweet tweet={data.tweet} />
	</div>
</div>

<style>
	#container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		flex-direction: column;
	}

	:global {
		body {
			background-color: #f2eee2;
			color: #0084f6;
			transition: background-color 0.3s
		}

		body.dark {
			background-color: #1d3040;
			color: #bfc2c7;
		}
	}
</style>
