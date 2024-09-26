<script lang='ts'>
	import TweetContainer from './TweetContainer.svelte';
	import s from '$rt_tw/tweet-not-found.module.css';
</script>

<TweetContainer>
	<div class={s.root}>
		<h3>Tweet not found</h3>
		<p>The embedded tweet could not be found…</p>
	</div>
</TweetContainer>
