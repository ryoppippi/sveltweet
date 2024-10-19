<script lang='ts'>
	import type { ComponentProps } from 'svelte';
	import EmbeddedTweet from './EmbeddedTweet.svelte';

	type Props = ComponentProps<typeof EmbeddedTweet>;

	const { ...rest }: Props = $props();
</script>

<EmbeddedTweet {...rest} />
