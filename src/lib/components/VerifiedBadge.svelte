<script lang='ts'>
	import type { TweetUser } from '$rt/api';
	import type { HTMLAttributes } from 'svelte/elements';
	import s from '../react-tweet/twitter-theme/verified-badge.module.css';
	import * as Icons from './icons';

	type Props = { user: TweetUser; class?: string };
	type IconComponent = typeof Icons[keyof typeof Icons];
	type DivSnippetProps = { Icon: IconComponent } & HTMLAttributes<HTMLDivElement>;

	const { user, class: className }: Props = $props();

	const isGovernment = user.verified_type === 'Government';
	const isBusiness = user.verified_type === 'Business';
	const isBlue = user.is_blue_verified;
	const isVerified = user.verified || isBlue || isGovernment || isBusiness;

</script>

{#snippet authorVerifiedDiv({ Icon, class: divClassName, ...rest }: DivSnippetProps)}
	<div {...rest} class={[divClassName, className]}>
		<Icon />
	</div>
{/snippet}

<!-- @see https://github.com/vercel/react-tweet/blob/3367f07a2177462af1d05d62b1785bb9aa4ab787/packages/react-tweet/src/twitter-theme/verified-badge.tsx#L20-L34 */ -->
{#if isVerified}
	{#if isGovernment}
		{@render authorVerifiedDiv({ Icon: Icons.VerifiedGovernment, class: s.verifiedGovernment })}
	{:else if isBusiness}
		{@render authorVerifiedDiv({ Icon: Icons.VerifiedBusiness, class: '' })}
	{:else if !isBlue}
		<!-- verified but not blue -->
		{@render authorVerifiedDiv({ Icon: Icons.Verified, class: s.verifiedOld })}
	{:else}
		<!-- normal paid premium user -->
		{@render authorVerifiedDiv({ Icon: Icons.Verified, class: s.verifiedBlue })}
	{/if}
{/if}
