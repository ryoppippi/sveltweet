<script lang='ts'>
	import { Tweet, TweetSkeleton } from '$lib';
	import ToggleDark from '../ToggleDark.svelte';
	import { EXAMPLE_TWEET_IDS } from './consts';
	import { getTweet } from './tweet.remote';

	let isDark = $state(false);
</script>

<div class='desc'>
	These tweets are statically generated.<br />
</div>

<div id='container'>
	<ToggleDark bind:isDark />
	{#each EXAMPLE_TWEET_IDS as id (id)}
		<div id={id}>
			<h1>
				<a href='#{id}'>{id}</a>
			</h1>
			<svelte:boundary>
				<!-- eslint-disable-next-line antfu/no-top-level-await -->
				<Tweet tweet={await getTweet(id)} />
				{#snippet pending()}
					<TweetSkeleton />
				{/snippet}
			</svelte:boundary>
		</div>
	{/each}
</div>

<style>
  .desc {
    margin-bottom: 1rem;
    font-size: 2rem;
    text-align: center;
  }

	#container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

  a {
    text-decoration: none;
    color: var(--text-color);
  }
</style>
