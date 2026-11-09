import { defineParams } from '@sveltejs/kit/params';

const PARAM_TYPE_ARRAY = ['sync', 'async'] as const;
type ParamType = typeof PARAM_TYPE_ARRAY[number];

function isParamType(param: string): param is ParamType {
	return PARAM_TYPE_ARRAY.includes(param as ParamType);
}

export const params = defineParams({
	type: param => (isParamType(param) ? param : undefined),
});
