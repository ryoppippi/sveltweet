<script lang='ts'>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import s from '../react-tweet/twitter-theme/tweet-container.module.css';
	import '../react-tweet/twitter-theme/theme.css';

	type Props = { children: Snippet } & HTMLAttributes<HTMLDivElement>;
	const { children, ...rest }: Props = $props();
</script>

<div
	{...rest}
	class={[s.root, 'react-tweet-theme']}
>
	<article class={s.article}>
		{@render children()}
	</article>
</div>
