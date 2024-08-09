<script lang='ts'>
	import VerifiedBadge from '../VerifiedBadge.svelte';
	import type { EnrichedQuotedTweet } from '$rt/utils.js';

	type Props = { tweet: EnrichedQuotedTweet };

	const { tweet }: Props = $props();
	const { user } = $derived(tweet);

	const isIconSquare = $derived(user.profile_image_shape === 'Square');
</script>

{#snippet span(name: string)}
	<span title={name}>{name}</span>
{/snippet}

<div class='header'>
	<a
		class='avatar'
		href={tweet.url}
		rel='noopener noreferrer'
		target='_blank'
	>
		<div
			class:avatarOverflow={!isIconSquare}
			class:avatarSquare={isIconSquare}
		>
			<img
				alt={user.name}
				height={20}
				loading='lazy'
				src={user.profile_image_url_https}
				width={20}
			/>
		</div>
	</a>
	<div class='author'>
		<div class='authorText'>
			{@render span(user.name)}
		</div>
		<VerifiedBadge {user} />
		<div class='username'>
			{@render span(`@${user.screen_name}`)}
		</div>
	</div>
</div>

<style>
	@import "$rt_qt/quoted-tweet-header.module.css" scoped;
</style>
