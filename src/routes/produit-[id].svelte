<script context="module">
  export function preload(page) {
    const id = page.params.id;
    return { id };
  }
</script>

<script>
  import { loadProducts, languageSelected } from "../stores.js";

  export let id;
  let products = loadProducts(id);

  const dict = {
    buy: {
      en: "buy",
      fr: "acheter"
    }
  };
</script>

<svelte:head>
  <title>Produit {id}</title>
</svelte:head>

{#if $products.product}
  <h1>{$products.product.titre[$languageSelected]} #{$products.product.id}</h1>
  <ul>
    <li>description: {$products.product.description[$languageSelected]}</li>
    <li>prix: {$products.product.prix}</li>
    <li>poids: {$products.product.poids}</li>
    <li>stock: {$products.product.stock}</li>
    {#if $products.product.stock}
      <li>
        <button class="buy btn btn-primary">
          {dict.buy[$languageSelected]}
        </button>
      </li>
    {/if}
    {#each $products.product.photos as photo}
      <li>
        <img
          src="/produits/{photo}"
          alt={$products.product.titre[$languageSelected]} />
      </li>
    {/each}
  </ul>
{/if}
