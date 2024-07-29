<script lang='ts'>
	export let src: string;
	export let alt: string;
	export let className: string = '';
	export let draggable: boolean = false;
</script>

<img class={className} alt={alt} draggable={draggable} src={src} />
