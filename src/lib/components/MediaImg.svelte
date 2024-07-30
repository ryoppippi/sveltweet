<script lang='ts'>
	type Props = {
		src: string;
		alt: string;
		className?: string;
		draggable?: boolean;
	};

	const {
		src,
		alt,
		className = '',
		draggable = false,
	}: Props = $props();
</script>

<img class={className} {alt} {draggable} {src} />
