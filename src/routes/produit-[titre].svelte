<script context="module">
  export function preload(page) {
    return { titre: page.params.titre };
  }
</script>

<script>
  export let titre;
</script>

<svelte:head>
  <title>{titre}</title>
</svelte:head>

<h1>{titre}</h1>

<p>This is the 'about' page. There's not much here.</p>
