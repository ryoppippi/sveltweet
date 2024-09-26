<script lang='ts'>
	import type { Snippet } from 'svelte';
	import s from '../react-tweet/twitter-theme/tweet-link.module.css';

	type Props = { href: string; children: Snippet };
	const { href, children }: Props = $props();
</script>

<a class={s.root} {href} rel='noopener noreferrer' target='_blank'>
	{@render children()}
</a>
