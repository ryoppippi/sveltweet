<script lang='ts'>
	import type { EnrichedTweet } from '$rt/utils.js';
	import s from '../react-tweet/twitter-theme/tweet-info.module.css';
	import TweetInfoCreatedAt from './TweetInfoCreatedAt.svelte';

	const { tweet }: { tweet: EnrichedTweet } = $props();
</script>

<div class={s.info}>
	<TweetInfoCreatedAt {tweet} />
	<a
		class={s.infoLink}
		aria-label='Twitter for Websites, Ads Information and Privacy'
		href='https://help.x.com/en/x-for-websites-ads-info-and-privacy'
		rel='noopener noreferrer'
		target='_blank'
	>
		<svg class={s.infoIcon} aria-hidden='true' viewBox='0 0 24 24'>
			<g>
				<path d='M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z'
				/>
			</g>
		</svg>
	</a>
</div>
