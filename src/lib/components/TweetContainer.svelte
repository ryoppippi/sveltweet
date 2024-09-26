<script lang='ts'>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import '../react-tweet/twitter-theme/theme.css';
	import s from '$rt_tw/tweet-container.module.css';

	type Props = { children: Snippet } & HTMLAttributes<HTMLDivElement>;
	const { children, ...rest }: Props = $props();
</script>

<div
	{...rest}
	class={s.root}
	class:react-tweet-theme={true}
>
	<article class={s.article}>
		{@render children()}
	</article>
</div>
