<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  .error {
    text-align: center;
    margin: auto;
  }
  h1,
  p {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<section class="error">
  <h1>{status}</h1>

  {#if status == '404'}
    <img src="img/404.jpg" alt="404" />
  {:else}
    <p>{error.message}</p>
  {/if}

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</section>
