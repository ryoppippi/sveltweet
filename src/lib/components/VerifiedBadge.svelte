<script lang='ts'>
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Icons from './icons';
	import type { TweetUser } from '$rt/api';

	type Props = { user: TweetUser };
	type IconComponent = typeof Icons[keyof typeof Icons];
	type DivSnippetProps = { Icon: IconComponent } & HTMLAttributes<HTMLDivElement>;

	const { user }: Props = $props();

	const isGovernment = user.verified_type === 'Government';
	const isBusiness = user.verified_type === 'Business';
	const isBlue = user.is_blue_verified;
	const isVerified = user.verified || isBlue || isGovernment || isBusiness;

</script>

{#snippet authorVerifiedDiv({ Icon, ...rest }: DivSnippetProps)}
	<div {...rest} class:authorVerified={true}>
		<Icon />
	</div>
{/snippet}

<!-- @see https://github.com/vercel/react-tweet/blob/3367f07a2177462af1d05d62b1785bb9aa4ab787/packages/react-tweet/src/twitter-theme/verified-badge.tsx#L20-L34 */ -->
{#if isVerified}
	{#if isGovernment}
		{@render authorVerifiedDiv({ Icon: Icons.VerifiedGovernment, class: 'verifiedGovernment' })}
	{:else if isBusiness}
		{@render authorVerifiedDiv({ Icon: Icons.VerifiedBusiness, class: '' })}
	{:else if !isBlue}
		<!-- verified but not blue -->
		{@render authorVerifiedDiv({ Icon: Icons.Verified, class: 'verifiedOld' })}
	{:else}
		<!-- normal paid premium user -->
		{@render authorVerifiedDiv({ Icon: Icons.Verified, class: 'verifiedBlue' })}
	{/if}
{/if}

<style>
	@import "$rt_tw/verified-badge.module.css" scoped;
	@import "$rt_tw/tweet-header.module.css?.authorVerified" scoped;
</style>
