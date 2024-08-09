<script lang='ts'>
	import type { EnrichedTweet } from '$lib/utils.js';

	const { tweet }: { tweet: EnrichedTweet } = $props();
</script>

<a class='root' href={tweet.in_reply_to_url} rel='noopener noreferrer' target='_blank'>
	Replying to @{tweet.in_reply_to_screen_name}
</a>

<style>
	@import "$rt/tweet-in-reply-to.module.css" scoped;
</style>
