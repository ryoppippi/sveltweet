<script lang='ts'>
	import type { HTMLAttributes } from 'svelte/elements';
	import TweetContainer from './TweetContainer.svelte';

</script>
{#snippet skeleton({ ...rest }: HTMLAttributes<HTMLSpanElement>)}
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <span class='skeleton' {...rest} />
{/snippet}

<TweetContainer class='tweet-container-skeleton'>
	{@render skeleton({ style: 'height: 3rem; margin-bottom: 0.75rem;' })}
	{@render skeleton({ style: 'height: 6rem; margin: 0.5rem 0;' })}

	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div style:border-top='var(--tweet-border)' style:margin='0.5rem 0' />

	{@render skeleton({ style: 'height: 2rem;' })}
	{@render skeleton(
		{ style: 'height: 2rem; border-radius: 9999px; margin-top: 0.5rem;' },
	)}
</TweetContainer>

<style>
:global {
  .tweet-container-skeleton {
    pointer-events: none;
    padding-bottom: 0.25rem;
  }
}

	@import "$rt/tweet-skeleton.module.css" scoped;
</style>
