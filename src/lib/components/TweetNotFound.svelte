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
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.75rem;
}
.root > h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
</style>
