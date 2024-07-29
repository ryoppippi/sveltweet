<script lang='ts'>
	export let href: string;
</script>

<a class='root' {href} rel='noopener noreferrer' target='_blank'>
	<slot />
</a>

<style>
	.root {
		font-weight: inherit;
		color: var(--tweet-color-blue-secondary);
		text-decoration: none;
		cursor: pointer;
	}

	.root:hover {
		text-decoration-thickness: 1px;
		text-decoration-line: underline;
	}
</style>
