<script lang='js'>
	let isDark = $state(false);

	$effect(() => {
		isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
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

<div>
	<input id='dark-mode' type='checkbox' bind:checked={isDark} />
	<label for='dark-mode'>Dark mode</label>
</div>
