<script>
	const { children } = $props();
</script>

{@render children()}

<style>
	:root {
		--text-color: #0084f6;
		--background-color: #f2eee2;
	}
	:global {
		body {
			background-color: var(--background-color);
			color: var(--text-color);
			transition: background-color 0.3s
		}

		@media (prefers-color-scheme: dark) {
			:root {
				--text-color: #bfc2c7;
				--background-color: #1d3040;
			}
		}
	}

</style>
