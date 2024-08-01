<script lang='ts'>
	import type { Snippet } from 'svelte';

	type Props = { href: string; children: Snippet };
	const { href, children }: Props = $props();
</script>

<a class='root' {href} rel='noopener noreferrer' target='_blank'>
	{@render children()}
</a>

<style>
	@import "$rt/tweet-link.module.css" scoped;
</style>
