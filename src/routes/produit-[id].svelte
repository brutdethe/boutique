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
  <!-- 
    {#each $products.product.photos as photo}
      <li>
        <img
          src="/produits/{photo}"
          alt={$products.product.titre[$languageSelected]} />
      </li>
    {/each}
-->

  <div class="carousel">
    <!-- carousel locator -->
    <input
      class="carousel-locator"
      id="slide-1"
      type="radio"
      name="carousel-radio"
      hidden="true"
      checked="true" />
    <input
      class="carousel-locator"
      id="slide-2"
      type="radio"
      name="carousel-radio"
      hidden="true" />
    <input
      class="carousel-locator"
      id="slide-3"
      type="radio"
      name="carousel-radio"
      hidden="true" />
    <input
      class="carousel-locator"
      id="slide-4"
      type="radio"
      name="carousel-radio"
      hidden="true" />

    <!-- carousel container -->
    <div class="carousel-container">
      <!-- carousel item -->
      <figure class="carousel-item">
        <label class="item-prev btn btn-action btn-lg" for="slide-4">
          <i class="icon icon-arrow-left" />
        </label>
        <label class="item-next btn btn-action btn-lg" for="slide-2">
          <i class="icon icon-arrow-right" />
        </label>
        <img
          class="img-responsive rounded"
          src="/produits/gaiwan-10cl_21-a.jpg"
          alt="macOS Yosemite Wallpaper" />
      </figure>
      <figure class="carousel-item">
        <label class="item-prev btn btn-action btn-lg" for="slide-1">
          <i class="icon icon-arrow-left" />
        </label>
        <label class="item-next btn btn-action btn-lg" for="slide-3">
          <i class="icon icon-arrow-right" />
        </label>
        <img
          class="img-responsive rounded"
          src="/produits/gaiwan-10cl_21-b.jpg"
          alt="macOS Yosemite Wallpaper" />
      </figure>
      <figure class="carousel-item">
        <label class="item-prev btn btn-action btn-lg" for="slide-2">
          <i class="icon icon-arrow-left" />
        </label>
        <label class="item-next btn btn-action btn-lg" for="slide-4">
          <i class="icon icon-arrow-right" />
        </label>
        <img
          class="img-responsive rounded"
          src="/produits/gaiwan-10cl_21-c.jpg"
          alt="macOS El Capitan Wallpaper" />
      </figure>
      <figure class="carousel-item">
        <label class="item-prev btn btn-action btn-lg" for="slide-3">
          <i class="icon icon-arrow-left" />
        </label>
        <label class="item-next btn btn-action btn-lg" for="slide-1">
          <i class="icon icon-arrow-right" />
        </label>
        <img
          class="img-responsive rounded"
          src="/produits/gaiwan-10cl_21-d.jpg"
          alt="macOS El Capitan Wallpaper" />
      </figure>
    </div>
    <!-- carousel navigation -->
    <div class="carousel-nav">
      <label class="nav-item text-hide c-hand" for="slide-1">1</label>
      <label class="nav-item text-hide c-hand" for="slide-2">2</label>
      <label class="nav-item text-hide c-hand" for="slide-3">3</label>
      <label class="nav-item text-hide c-hand" for="slide-4">4</label>
    </div>
  </div>

  <ul>
    <li>{$products.product.description[$languageSelected]}</li>
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
  </ul>
{/if}
