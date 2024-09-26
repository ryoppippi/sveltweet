<script lang='ts'>
	import type { EnrichedTweet } from '$rt/utils.js';
	import s from '$rt_tw/tweet-in-reply-to.module.css';

	const { tweet }: { tweet: EnrichedTweet } = $props();
</script>

<a class={s.root} href={tweet.in_reply_to_url} rel='noopener noreferrer' target='_blank'>
	Replying to @{tweet.in_reply_to_screen_name}
</a>
