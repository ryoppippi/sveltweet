export function match(param: string): param is 'sync' | 'async' {
	return ['sync', 'async'].includes(param);
}
