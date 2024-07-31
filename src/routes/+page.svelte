<script lang='ts'>
	let id = $state('1629307668568633344');
	let isAsync = $state(false);
</script>

<form
	action="/{isAsync ? 'async' : ''}/{id}"
	method='GET'
>
	<div>
		<label for='id'>Enter a X ID:</label>
		<input type='text' bind:value={id} />
	</div>
	<div>
		<label for='async'>Async Streaming</label>
		<input id='async' type='checkbox' bind:checked={isAsync} />
	</div>
	<button type='submit'>Go</button>
</form>

<style>
  form {
    display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  form > div {
	margin-bottom: 1rem;
	display: flex;
	flex-direction: row;
  }

  input {
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
</style>
