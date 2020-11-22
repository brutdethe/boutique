<script>
  import { basket, languageSelected } from "../stores.js";

  const dict = {
    title: { en: "Summary of purchases", fr: "Récapitulatif des achats" },
    empty: {
      en: "There are no items in your shopping cart yet.",
      fr: "Il n'y a pas encore d'article dans votre panier."
    },
    backToShop: {
      en: "back to the store",
      fr: "revenir dans la boutique"
    },
    product: {
      en: "item",
      fr: "produit"
    },
    price: {
      en: "price",
      fr: "prix"
    },
    qty: {
      en: "qty",
      fr: "qté"
    }
  };
</script>

<style>
  table {
    margin: 1rem 0;
  }
</style>

<svelte:head>
  <title>{dict.title[$languageSelected]}</title>
</svelte:head>
<h2>{dict.title[$languageSelected]}</h2>
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>{dict.product[$languageSelected]}</th>
      <th>{dict.price[$languageSelected]}</th>
      <th>{dict.qty[$languageSelected]}</th>
    </tr>
  </thead>
  <tbody>
    {#if $basket.length}
      {#each $basket as item}
        <tr class="active">
          <td>{item.titre[$languageSelected]}</td>
          <td>{item.prix} €</td>
          <td>1</td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan="3">{dict.empty[$languageSelected]}</td>
      </tr>
    {/if}
  </tbody>
</table>

<a href="/" class="back-shop">&lsaquo; {dict.backToShop[$languageSelected]}</a>
