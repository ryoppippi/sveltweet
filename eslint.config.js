import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	svelte: true,
	tailwind: false,
	ignores: ['README.md', 'src/lib/utils.ts', 'src/lib/date-utils.ts', 'src/lib/api/**/*.ts'],
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
