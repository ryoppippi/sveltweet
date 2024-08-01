<script lang='ts'>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import 'react-tweet/theme.css';

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
	.root {
		width: 100%;
		min-width: 250px;
		max-width: 550px;
		overflow: hidden;
		/* Base font styles */
		color: var(--tweet-font-color);
		font-family: var(--tweet-font-family);
		font-weight: 400;
		box-sizing: border-box;
		border: var(--tweet-border);
		border-radius: 12px;
		margin: var(--tweet-container-margin);
		background-color: var(--tweet-bg-color);
		transition-property: background-color, box-shadow;
		transition-duration: 0.2s;
	}
	.root:hover {
		background-color: var(--tweet-bg-color-hover);
	}
	.article {
		position: relative;
		box-sizing: inherit;
		padding: 0.75rem 1rem;
	}
</style>
