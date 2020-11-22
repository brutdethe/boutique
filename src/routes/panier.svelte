<script>
  import { basket } from "../stores.js";
</script>

<style>
  table {
    margin: 1rem 0;
  }
</style>

<svelte:head>
  <title>Récapitulatif des achats</title>
</svelte:head>
<h2>Récapitulatif des achats</h2>
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>produit</th>
      <th>prix</th>
      <th>quantité</th>
    </tr>
  </thead>
  <tbody>
    {#if $basket.length}
      <tr class="active">
        <td>The Shawshank Redemption</td>
        <td>52,00 €</td>
        <td>1</td>
      </tr>
    {:else}
      <tr>
        <td colspan="3">Il n'y a pas encore d'article dans votre panier.</td>
      </tr>
    {/if}
  </tbody>
</table>

<a href="/" class="back-shop">&lsaquo; revenir dans la boutique</a>
{console.log($basket)}
