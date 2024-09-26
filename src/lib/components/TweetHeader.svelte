<script lang='ts'>
	import s from '../react-tweet/twitter-theme/tweet-header.module.css';
	import VerifiedBadge from './VerifiedBadge.svelte';
	import type { EnrichedTweet } from '$rt/utils.js';

	type Props = {
		tweet: EnrichedTweet;
	};

	const { tweet }: Props = $props();

	const { user } = tweet;
</script>

<div class={s.header}>
	<a class={s.avatar} href={tweet.url} rel='noopener noreferrer' target='_blank'>
		<div
			class={s.avatarOverflow}
			class:avatarSquare={user.profile_image_shape === 'Square'}
		>
			<img
				style:margin-top='0'
				style:margin-bottom='0'
				alt={user.name}
				height={48}
				loading='lazy'
				src={user.profile_image_url_https}
				width={48}
			/>
		</div>
		<div class={s.avatarOverflow}>
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div class={s.avatarShadow} />
		</div>
	</a>
	<div class={s.author}>
		<a class={s.authorLink} href={tweet.url} rel='noopener noreferrer' target='_blank'>
			<div class={s.authorLinkText}>
				<span title={user.name}>{user.name}</span>
			</div>
			<VerifiedBadge {user} />
		</a>
		<div class={s.authorMeta}>
			<a class={s.username} href={tweet.url} rel='noopener noreferrer' target='_blank'>
				<span title='@{user.screen_name}'>@{user.screen_name}</span>
			</a>
			<div class={s.authorFollow}>
				<span class={s.separator}>·</span>
				<a class={s.follow} href={user.follow_url} rel='noopener noreferrer' target='_blank'>
					Follow
				</a>
			</div>
		</div>
	</div>
	<a
		class={s.brand}
		aria-label='View on X'
		href={tweet.url}
		rel='noopener noreferrer'
		target='_blank'
	>
		<svg class={s.twitterIcon} aria-hidden='true' viewBox='0 0 24 24'>
			<g>
				<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
				/>
			</g>
		</svg>
	</a>
</div>
