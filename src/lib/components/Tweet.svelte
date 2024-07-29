<script lang='ts'>
	import type { ITweet } from '../types.js';
	import EmbeddedTweet from './EmbeddedTweet.svelte';

	export let components = {};
	export let tweet: ITweet;
</script>

<EmbeddedTweet {components} {tweet} />
