<script lang='ts'>
	import type { EnrichedTweet } from 'react-tweet';
	import AvatarImg from './AvatarImg.svelte';
	import VerifiedBadge from './VerifiedBadge.svelte';

	type Props = {
		tweet: EnrichedTweet;
	};

	const { tweet }: Props = $props();

	const { user } = tweet;
</script>

<div class='header'>
	<a class='avatar' href={tweet.url} rel='noopener noreferrer' target='_blank'>
		<div
			class='avatarOverflow'
			class:avatarSquare={user.profile_image_shape === 'Square'}
		>
			<AvatarImg
				style='margin-top: 0; margin-bottom: 0;'
				alt={user.name}
				height={48}
				src={user.profile_image_url_https}
				width={48}
			/>
		</div>
		<div class='avatarOverflow'>
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div class='avatarShadow' />
		</div>
	</a>
	<div class='author'>
		<a class='authorLink' href={tweet.url} rel='noopener noreferrer' target='_blank'>
			<div class='authorLinkText'>
				<span title={user.name}>{user.name}</span>
			</div>
			<VerifiedBadge {user} />
		</a>
		<div class='authorMeta'>
			<a class='username' href={tweet.url} rel='noopener noreferrer' target='_blank'>
				<span title='@{user.screen_name}'>@{user.screen_name}</span>
			</a>
			<div class='authorFollow'>
				<span class='separator'>·</span>
				<a class='follow' href={user.follow_url} rel='noopener noreferrer' target='_blank'>
					Follow
				</a>
			</div>
		</div>
	</div>
	<a
		class='brand'
		aria-label='View on Twitter'
		href={tweet.url}
		rel='noopener noreferrer'
		target='_blank'
	>
		<svg class='twitterIcon' aria-hidden='true' viewBox='0 0 24 24'>
			<g>
				<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
				/>
			</g>
		</svg>
	</a>
</div>

<style>
	.header {
		display: flex;
		padding-bottom: 0.75rem;
		line-height: var(--tweet-header-line-height);
		font-size: var(--tweet-header-font-size);
		white-space: nowrap;
		overflow-wrap: break-word;
		overflow: hidden;
	}

	.avatar {
		position: relative;
		height: 48px;
		width: 48px;
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

	.avatarShadow {
		height: 100%;
		width: 100%;
		transition-property: background-color;
		transition-duration: 0.2s;
		box-shadow: rgb(0 0 0 / 3%) 0px 0px 2px inset;
	}

	.avatarShadow:hover {
		background-color: rgba(26, 26, 26, 0.15);
	}

	.author {
		max-width: calc(100% - 84px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 0.5rem;
	}

	.authorLink {
		text-decoration: none;
		color: inherit;
		display: flex;
		align-items: center;
	}

	.authorLink:hover {
		text-decoration-line: underline;
	}

	.authorLinkText {
		font-weight: 700;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.authorMeta {
		display: flex;
	}
	.authorFollow {
		display: flex;
	}
	.username {
		color: var(--tweet-font-color-secondary);
		text-decoration: none;
		text-overflow: ellipsis;
	}
	.follow {
		color: var(--tweet-color-blue-secondary);
		text-decoration: none;
		font-weight: 700;
	}
	.follow:hover {
		text-decoration-line: underline;
	}
	.separator {
		padding: 0 0.25rem;
	}

	.brand {
		margin-inline-start: auto;
	}

	.twitterIcon {
		width: 23.75px;
		height: 23.75px;
		color: var(--tweet-twitter-icon-color);
		fill: currentColor;
		user-select: none;
	}
</style>
