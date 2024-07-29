import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	svelte: true,
	tailwind: false,
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
