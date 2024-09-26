<script lang='ts'>
	import s from '../react-tweet/twitter-theme/tweet-not-found.module.css';
	import TweetContainer from './TweetContainer.svelte';
</script>

<TweetContainer>
	<div class={s.root}>
		<h3>Tweet not found</h3>
		<p>The embedded tweet could not be found…</p>
	</div>
</TweetContainer>
