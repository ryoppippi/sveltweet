<script lang='ts'>
	let id = $state('1629307668568633344');
</script>

<form action={`/${id}`} method='GET'>
	<label for='id'>Enter a X ID:</label>
	<input type='text' bind:value={id} />
	<button type='submit'>Go</button>
</form>

<style>
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
</style>
