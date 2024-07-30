<script lang='ts'>
	import Verified from './icons/Verified.svelte';
	import VerifiedBusiness from './icons/VerifiedBusiness.svelte';
	import VerifiedGovernment from './icons/VerifiedGovernment.svelte';

	type Props = {
		user: any;
	};
	const { user }: Props = $props();

	const verified = user.verified || user.is_blue_verified || user.verified_type;
	let iconComponent = $state(Verified);
	let iconClassName = $state('verifiedBlue');

	if (verified) {
		if (!user.is_blue_verified) {
			iconClassName = 'verifiedOld';
		}
		switch (user.verified_type) {
			case 'Government':
				iconComponent = VerifiedGovernment;
				iconClassName = 'verifiedGovernment';
				break;
			case 'Business':
				iconComponent = VerifiedBusiness;
				iconClassName = '';
				break;
		}
	}
</script>

{#if verified}
	<div class='authorVerified {iconClassName}'>
		<svelte:component this={iconComponent} />
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
