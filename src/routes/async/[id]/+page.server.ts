import { load as _load } from '../../[id]/+page.server.js';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	// @ts-expect-error type mismatch
	return _load({ params });
}
