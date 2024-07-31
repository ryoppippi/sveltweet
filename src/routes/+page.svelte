<script lang='ts'>
	let id = $state('1629307668568633344');
	let isAsync = $state(false);
</script>

<div class='nav'>
	<h1>
		<a href='https://github.com/ryoppippi/svelte-tweet'> Svelte Tweet </a>
	</h1>
</div>

<div class='nav'>
	<a href='/examples'>
		examples
	</a>
</div>

<form
	action="/{isAsync ? 'async' : 'sync'}/{id}"
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
    height: 60vh;
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

  .nav {
	display: flex;
	flex-direction: row;
	justify-content: center;
  }

  .nav a {
	color: var(--text-color);
	font-size: 2rem;
  }

</style>
