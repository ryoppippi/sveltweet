# Sveltweet (__Svelte + Tweet__)

[![npm version](https://img.shields.io/npm/v/sveltweet?color=yellow)](https://npmjs.com/package/sveltweet)
[![npm downloads](https://img.shields.io/npm/dm/sveltweet?color=yellow)](https://npmjs.com/package/sveltweet)


The best way to embed tweets in your Svelte app, supporting both SSR and static prerendering modes.

- The tweet is loaded in the server-side.
- No need for any additional client-side scripts.
- No need for any loading UI, the tweet is available immediately.
- Supports both SSR and prerendering.

> This package is a Svelte version of [vercel/react-tweet](https://github.com/vercel/react-tweet) licensed under MIT License, many thanks to the original authors for making it possible!

> This repo is fork of [fayez-nazzal/sveltekit-tweet](https://github.com/fayez-nazzal/sveltekit-tweet)

## Requirements
- Svelte 5.16.0 or later ( This library uses [`runes`](https://svelte-5-preview.vercel.app/docs/runes) )

## Installation

```bash
npx nypm add sveltweet
```

## Usage

### SvelteKit

#### Recommended: Using Remote Functions

The simplest way to embed tweets is using [SvelteKit's remote functions](https://svelte.dev/docs/kit/remote-functions). This approach allows you to fetch tweet data directly inside your components without setting up separate server files.

1. Create a remote function to fetch tweet data:

    ```ts
    // src/lib/tweet.remote.ts
    import { query } from '@sveltejs/kit';
    import { getTweet } from 'sveltweet/api';

    export const getTweetData = query(async (id: string) => getTweet(id));
    ```

2. Use it directly in your component:

    ```svelte
    <script lang='ts'>
        import { Tweet } from 'sveltweet';
        import { getTweetData } from '$lib/tweet.remote';

        const tweetId = '1234567890';
    </script>

    <!-- Recommended: Using await directly -->
    <svelte:boundary>
        <Tweet tweet={await getTweetData(tweetId)} />
        {#snippet pending()}
            <TweetSkeleton />
        {/snippet}
    </svelte:boundary>

    <!-- Alternative: Using {#await} block for loading states -->
    {#await getTweetData(tweetId)}
        <p>Loading tweet...</p>
    {:then tweet}
        <Tweet {tweet} />
    {:catch error}
        <p>Error loading tweet: {error.message}</p>
    {/await}
    ```

> [!NOTE]
> Remote functions and await syntax require configuration. See the [SvelteKit remote functions documentation](https://svelte.dev/docs/kit/remote-functions) and [Svelte await expressions documentation](https://svelte.dev/docs/svelte/await-expressions) for setup instructions.

> [!IMPORTANT]
> When using `await` directly, make sure to wrap your component with `<svelte:boundary>` for error handling. See the [Svelte boundary documentation](https://svelte.dev/docs/svelte/svelte-boundary) for details.

#### Alternative: Using Traditional Loaders

If you prefer the traditional approach or need more control over data loading:

1.  Go to the tweet you want to embed. You will find the URL
2.  Use the `getTweet` function in your `+page.server.ts` file to fetch the tweet data.

    ```ts
    import { getTweet } from 'sveltweet/api';
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

3.  Use the `Tweet` component in your `+page.svelte` file to render the tweet.

    ```svelte
    <script lang='ts'>
    	import { Tweet } from 'sveltweet';
    	import type { PageData } from './$types';

        const { data }: { data: PageData } = $props()
    </script>

    <Tweet tweet={data.tweet} />
    ```

### Svelte

```svelte
<script lang='ts'>
    import { Tweet } from 'sveltweet';
    import { getTweet } from 'sveltweet/api';

    const id = '';
</script>

{#await getTweet(id) then tweet}
    <Tweet tweet={data.tweet} />
{/await}
```

## Customisation

`Tweet` shares the same CSS file with [`react-tweet`](https://react-tweet.vercel.app/). 
So, refer to the [`Custom Theme`](https://react-tweet.vercel.app/custom-theme) section in the `react-tweet` documentation to customise the tweet appearance.

# License
[MIT](./LICENSE)
