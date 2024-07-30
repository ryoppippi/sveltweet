<script lang='ts'>
	let id = $state('');
</script>

<form action={`/${id}`} method='GET'>
	<input type='text' bind:value={id} />
	<button type='submit'>Go</button>
</form>
