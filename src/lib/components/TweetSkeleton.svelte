<script lang='ts'>
	import type { HTMLAttributes } from 'svelte/elements';
	import TweetContainer from './TweetContainer.svelte';

</script>
{#snippet skeleton({ ...rest }: HTMLAttributes<HTMLSpanElement>)}
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <span class='skeleton' {...rest} />
{/snippet}

<TweetContainer style='pointer-events: none; padding-bottom: 0.25rem;'>
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
.skeleton {
  display: block;
  width: 100%;
  border-radius: 5px;
  background-image: var(--tweet-skeleton-gradient);
  background-size: 400% 100%;
  animation: loading 8s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    background-position: 200% 0;
  }
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
