<script lang='ts'>
	import type { Snippet } from 'svelte';

	type Props = { href: string; children: Snippet };
	const { href, children }: Props = $props();
</script>

<a class='root' {href} rel='noopener noreferrer' target='_blank'>
	{@render children()}
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
