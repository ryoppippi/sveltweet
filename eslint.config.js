import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	type: 'lib',
	svelte: true,
	tailwind: false,
	ignores: ['README.md', 'src/lib/react-tweet'],
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
