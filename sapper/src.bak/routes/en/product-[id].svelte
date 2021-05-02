<script context="module">
  export function preload(page) {
    const id = page.params.id;
    return { id };
  }
</script>

<script>
  import Product from "../../components/Product.svelte";
  export let id;
</script>

<Product lang="en" {id} />
