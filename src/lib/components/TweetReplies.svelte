<script lang='ts'>
	import { type EnrichedTweet, formatNumber } from '$rt/utils';
	import s from '$rt_tw/tweet-replies.module.css';

	type Props = { tweet: EnrichedTweet };
	const { tweet }: Props = $props();

	const replyText
		= tweet.conversation_count === 0
			? 'Read more on X'
			: tweet.conversation_count === 1
			? `Read ${formatNumber(tweet.conversation_count)} reply`
			: `Read ${formatNumber(tweet.conversation_count)} replies`;
</script>

<div class={s.replies}>
	<a class={s.link} href={tweet.url} rel='noopener noreferrer' target='_blank'>
		<span class={s.text}>
			{replyText}
		</span>
	</a>
</div>
