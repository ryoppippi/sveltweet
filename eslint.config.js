import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	svelte: true,
	tailwind: false,
	ignores: ['README.md', 'src/lib/react-tweet'],
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
