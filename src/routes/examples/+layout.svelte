<script>
	const { children } = $props();
</script>

<svelte:boundary>
	{@render children()}

	{#snippet pending()}
		<div style:text-align='center' style:padding='2rem'>
			<p>Loading tweets...</p>
		</div>
	{/snippet}

	{#snippet failed(error)}
		<div style:padding='1rem' style:color='red'>
			<h2>Something went wrong</h2>
			<p>{error.message}</p>
		</div>
	{/snippet}
</svelte:boundary>
