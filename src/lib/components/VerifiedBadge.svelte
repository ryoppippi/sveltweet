<script lang='ts'>
	import type { TweetUser } from 'react-tweet/api';
	import * as Icons from './icons';

	type Props = {
		user: TweetUser;
	};
	const { user }: Props = $props();

	const isVerified = user.verified || user.is_blue_verified || user.verified_type != null;
	const isGovernment = user.verified_type === 'Government';
	const isBusiness = user.verified_type === 'Business';
	const isBlue = user.is_blue_verified;
</script>

{#if isVerified}
	<div
		class='authorVerified'
		class:verifiedBlue={isBlue && !isGovernment && !isBusiness /* blue and nor government or business */}
		class:verifiedGovernment={isGovernment}
		class:verifiedOld={!isBlue && !isGovernment && !isBusiness /* verifed but not blue */}
	>
		{#if isGovernment}
			<Icons.VerifiedGovernment />
		{:else if isBusiness}
			<Icons.VerifiedBusiness />
		{:else}
			<Icons.Verified />
		{/if}
	</div>
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
