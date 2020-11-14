<script context="module">
  export function preload(page) {
    return { id: page.params.id };
  }
</script>

<script>
  export let id;
</script>

<svelte:head>
  <title>{id}</title>
</svelte:head>

<h1>{id}</h1>

<p>This is the 'product' page. There's not much here.</p>
