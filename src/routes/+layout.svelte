<script>
	const { children } = $props();
</script>

{@render children()}

<style>
	:global {
		body {
			background-color: #f2eee2;
			color: #0084f6;
			transition: background-color 0.3s
		}

		@media (prefers-color-scheme: dark) {
			body {
				background-color: #1d3040;
				color: #bfc2c7;
			}
		}
	}
</style>
