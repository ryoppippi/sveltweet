<script lang='ts'>
	import type { EnrichedQuotedTweet } from 'react-tweet';
	import VerifiedBadge from '../VerifiedBadge.svelte';

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
.header {
  display: flex;
  padding: 0.75rem 0.75rem 0 0.75rem;
  line-height: var(--tweet-header-line-height);
  font-size: var(--tweet-header-font-size);
  white-space: nowrap;
  overflow-wrap: break-word;
  overflow: hidden;
}

.avatar {
  position: relative;
  height: 20px;
  width: 20px;
}

.avatarOverflow {
	height: 100%;
	width: 100%;
	position: absolute;
	overflow: hidden;
	border-radius: 9999px;
}

.avatarSquare {
  border-radius: 4px;
}

.author {
  display: flex;
  margin: 0 0.5rem;
}

.authorText {
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.username {
  color: var(--tweet-font-color-secondary);
  text-decoration: none;
  text-overflow: ellipsis;
  margin-left: 0.125rem;
}
</style>
