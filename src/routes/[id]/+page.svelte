<script lang='js'>
	import ToggleDark from './ToggleDark.svelte';
	import { SvelteTweet } from '$lib';

	const { data } = $props();

	let isDark = $state(false);

	$effect(() => {
		const mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)');
		isDark = mediaQueryObj.matches;
	});

	$effect(() => {
		if (isDark) {
			window.document.body.classList.add('dark');
			window.document.body.dataset.theme = 'dark';
		}
		else {
			window.document.body.classList.remove('dark');
			window.document.body.dataset.theme = 'light';
		}
	});
</script>

<div id='container'>
	<ToggleDark />

	<SvelteTweet tweet={data.tweet} />
</div>

<style>
	#container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>
