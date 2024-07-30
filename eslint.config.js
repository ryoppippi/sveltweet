import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	svelte: true,
	tailwind: false,
	ignores: ['README.md'],
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
