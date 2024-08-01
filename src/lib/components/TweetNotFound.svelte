<script lang='ts'>
	import TweetContainer from './TweetContainer.svelte';
</script>

<TweetContainer>
	<div class='root'>
		<h3>Tweet not found</h3>
		<p>The embedded tweet could not be found…</p>
	</div>
</TweetContainer>

<style>
	@import "$rt/tweet-not-found.module.css" scoped;
</style>
