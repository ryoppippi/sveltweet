const PARAM_TYPE_ARRAY = ['sync', 'async'] as const;
type ParamType = typeof PARAM_TYPE_ARRAY[number];
export function match(param: string): param is ParamType {
	return PARAM_TYPE_ARRAY.includes(param as ParamType);
}
