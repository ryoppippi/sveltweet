# Svelte Tweet

The best way to embed tweets in your Svelte app, supporting both SSR and static prerendering modes.

- The tweet is loaded in the server-side.
- No need for any additonal client-side scripts.
- No need for any loading UI, the tweet is available immediately.
- Supports both SSR and prerendering.

> This package is a Svelte version of [vercel/react-tweet](https://github.com/vercel/react-tweet) licensed under MIT License, many thanks to the original authors for making it possible!

# Requirements
- Svelte 5.0.0-next or later ( This libray uses [`runes`](https://svelte-5-preview.vercel.app/docs/runes) )

## Installation

```bash
npx nypm add @ryoppippi/sveltekit-tweet
```

## Usage

### SvelteKit
1.  Go to the tweet you want to embed. You will find the URL i
2.  Use the `getTweet` function in your `+page.server.ts` file to fetch the tweet data.

    ```ts
    import { getTweet } from 'svelte-tweet/api';
    import { error } from '@sveltejs/kit';
    import type { RequestEvent } from './$types';

    export async function load({ params }: RequestEvent) {
        const { id } = params;
        try {
            const tweet = await getTweet(id);

            return { tweet };
        }
        catch {
            return error(500, 'Could not load tweet');
        }
    }

    ```

3.  Use the `SvelteTweet` component in your `+page.svelte` file to render the tweet.

    ```svelte
    <script lang='ts'>
    	import { SvelteTweet } from 'svelte-tweet';
    	import type { PageData } from './$types';

        const { data }: { data: PageData } = $props()
    </script>

    <SvelteTweet tweet={data.tweet} />
    ```

### Svelte

```svelte
<script lang='ts'>
    import { SvelteTweet } from 'svelte-tweet';
    import { getTweet } from 'svelte-tweet/api';

    const id = '';
</script>

{#await getTweet(id) then tweet}
    <SvelteTweet tweet={data.tweet} />
{/await}


# Acknowledgements

This repo is fork of [fayez-nazzal/sveltekit-tweet](https://github.com/fayez-nazzal/sveltekit-tweet)
