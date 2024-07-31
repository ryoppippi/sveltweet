<script lang='ts'>
	import type { TweetUser } from 'react-tweet/api';
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Icons from './icons';

	type Props = { user: TweetUser };
	type IconComponent = typeof Icons[keyof typeof Icons];
	type DivSnippetProps = { icon: IconComponent } & HTMLAttributes<HTMLDivElement>;

	const { user }: Props = $props();

	const isGovernment = user.verified_type === 'Government';
	const isBusiness = user.verified_type === 'Business';
	const isBlue = user.is_blue_verified;
	const isVerified = user.verified || isBlue || isGovernment || isBusiness;

</script>

{#snippet authorVerifiedDiv({ icon, ...rest }: DivSnippetProps)}
	<div {...rest} class:authorVerified={true}>
		<svelte:component this={icon} />
	</div>
{/snippet}

<!-- @see https://github.com/vercel/react-tweet/blob/3367f07a2177462af1d05d62b1785bb9aa4ab787/packages/react-tweet/src/twitter-theme/verified-badge.tsx#L20-L34 */ -->
{#if isVerified}
	{#if isGovernment}
		{@render authorVerifiedDiv({ icon: Icons.VerifiedGovernment, class: 'verifiedGovernment' })}
	{:else if isBusiness}
		{@render authorVerifiedDiv({ icon: Icons.VerifiedBusiness, class: '' })}
	{:else if !isBlue}
		<!-- verified but not blue -->
		{@render authorVerifiedDiv({ icon: Icons.Verified, class: 'verifiedOld' })}
	{:else}
		<!-- normal paid premium user -->
		{@render authorVerifiedDiv({ icon: Icons.Verified, class: 'verifiedBlue' })}
	{/if}
{/if}

<style>
.verifiedOld {
	color: var(--tweet-verified-old-color);
}

.verifiedBlue {
	color: var(--tweet-verified-blue-color);
}

.verifiedGovernment {
	/* color: var(--tweet-verified-government-color); */
	color: rgb(130, 154, 171);
}

.authorVerified {
	display: inline-flex;
}
</style>
