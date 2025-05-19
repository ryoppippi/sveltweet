<script lang='ts'>
	import type { EnrichedQuotedTweet } from '$rt/utils.js';
	import s from '../../react-tweet/twitter-theme/quoted-tweet/quoted-tweet-header.module.css';
	import VerifiedBadge from '../VerifiedBadge.svelte';

	type Props = { tweet: EnrichedQuotedTweet };

	const { tweet }: Props = $props();
	const { user } = $derived(tweet);

	const isIconSquare = $derived(user.profile_image_shape === 'Square');
</script>

{#snippet span(name: string)}
	<span title={name}>{name}</span>
{/snippet}

<div class={s.header}>
	<a
		class={s.avatar}
		aria-label={`View ${user.name}'s profile`}
		href={tweet.url}
		rel='noopener noreferrer'
		target='_blank'
	>
		<div class='{s.avatarOverflow} {isIconSquare ? s.avatarSquare : ''}'>
			<img
				alt={user.name}
				height={20}
				loading='lazy'
				src={user.profile_image_url_https}
				width={20}
			/>
		</div>
	</a>
	<div class={s.author}>
		<div class={s.authorText}>
			{@render span(user.name)}
		</div>
		<VerifiedBadge {user} />
		<div class={s.username}>
			{@render span(`@${user.screen_name}`)}
		</div>
	</div>
</div>
