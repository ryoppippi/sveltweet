<script lang='ts'>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	// eslint-disable-next-line antfu/no-import-dist
	import '../react-tweet/dist/twitter-theme/theme.css';

	type Props = { children: Snippet } & HTMLAttributes<HTMLDivElement>;
	const { children, ...rest }: Props = $props();
</script>

<div
	{...rest}
	class:react-tweet-theme={true}
	class:root={true}
>
	<article class='article'>
		{@render children()}
	</article>
</div>

<style>
	@import "$rt_tw/tweet-container.module.css" scoped;
</style>
