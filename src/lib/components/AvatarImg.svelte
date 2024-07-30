<script lang='ts'>
	type Props = {
		src: string;
		alt: string;
		width: number;
		height: number;
		style?: string;
	};

	const {
		src,
		alt,
		width,
		height,
		style = '',
	}: Props = $props();
</script>

<img {style} {alt} {height} loading='lazy' {src} {width} />
