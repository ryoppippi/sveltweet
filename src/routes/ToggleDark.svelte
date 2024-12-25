<script lang='ts'>
	import { MediaQuery } from 'svelte/reactivity';

	let { isDark = $bindable(false) }: { isDark: boolean } = $props();

	const prefersDark = new MediaQuery('(prefers-color-scheme: dark)');

	$effect(() => {
		isDark = prefersDark.current;

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

<div>
	<input id='dark-mode' type='checkbox' bind:checked={isDark} />
	<label for='dark-mode'>Dark mode</label>
</div>
