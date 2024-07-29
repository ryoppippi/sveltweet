# SvelteKit Tweet

The best way to embed tweets in your SvelteKit app, supporting both SSR and static prerendering modes.

- The tweet is loaded in the server-side.
- No need for any additonal client-side scripts.
- No need for any loading UI, the tweet is available immediately.
- Supports both SSR and prerendering.

> This package is a sveltekit version of [vercel/react-tweet](https://github.com/vercel/react-tweet) licensed under MIT License, many thanks to the original authors for making it possible!

## Installation

```bash
npm install sveltekit-tweet
```

## Usage

1.  Go to the tweet you want to embed. You will find the URL i
2.  Use the `getTweet` function in your `+page.server.ts` file to fetch the tweet data.

    ```ts
    import { getTweet } from 'sveltekit-tweet/server';

    export async function load() {
    	try {
    		const tweet = await getTweet('1694201062717034868');

    		return {
    			tweet
    		};
    	}
    	catch (error) {
    		return {
    			status: 500,
    			error: 'Could not load tweet'
    		};
    	}
    }
    ```

3.  Use the `Tweet` component in your `+page.svelte` file to render the tweet.

    ```svelte
    <script lang='ts'>
    	import Tweet from 'sveltekit-tweet/server';
    	import type { PageData } from './$types';

    	export let data: PageData;
    </script>

    {#if data.tweet}
    	<Tweet tweet={data.tweet} />
    {:else if data.error}
    	<p>{data.error}</p>
    {/if}
    ```

## TODOs

- [ ] Add tests.
- [ ] Drop external dependencies.
- [ ] Add support for Quoted Tweets.
- [ ] Add TweetNotFound component.
- [x] Add easy way for mdsvex integration.

# Acknowledgements
This repo is fork of [fayez-nazzal/sveltekit-tweet](https://github.com/fayez-nazzal/sveltekit-tweet)

