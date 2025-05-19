<script lang='ts'>
	import { Tweet } from '$lib';
	import ToggleDark from '../ToggleDark.svelte';

	const { data } = $props();
	const { tweets } = data;

	let isDark = $state(false);
</script>

<div class='desc'>
	These tweets are statically generated.<br />
	Let's disable JavaScript and reload the page to see the tweets.
</div>

<div id='container'>
	<ToggleDark bind:isDark />
	{#each tweets as { tweet, id } (id)}
		<div id={id}>
			<h1>
				<a href='#{id}'>{id}</a>
			</h1>
			<Tweet {tweet} />
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
