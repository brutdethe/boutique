<script>
  import { loadProducts, categorySelected, githubDataRepo } from "../stores.js";
  import Buy from "../components/Buy.svelte";
  import Price from "../components/Price.svelte";

  export let id;
  export let lang;

  let products = loadProducts(id);

  const dict = {
    title: {
      en: "product",
      fr: "produit"
    }
  };

  const photosUrl = `https://raw.githubusercontent.com/${$githubDataRepo}/main/`;
</script>

<style>
  .carousel {
    box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
  }

  .price {
    padding-top: 0.8rem;
    text-align: right;
    font-weight: 700;
  }

  .btn {
    width: 5rem;
  }
</style>

<svelte:head>
  <title>{dict.title[lang]}-{id}</title>
</svelte:head>

{#if $products.product}
  <div class="card">
    {#if $products.product.photos.length}
      <div class="card-image carousel">
        {#each $products.product.photos as photo, count}
          <input
            class="carousel-locator"
            id="slide-{count + 1}"
            type="radio"
            name="carousel-radio"
            hidden="true"
            checked={!count && true} />
        {/each}
        <div class="carousel-container">
          {#each $products.product.photos as photo, count}
            <figure class="carousel-item">
              <label
                class="item-prev btn btn-action btn-lg"
                for="slide-{count ? count : $products.product.photos.length}">
                <i class="icon icon-arrow-left" />
              </label>
              <label
                class="item-next btn btn-action btn-lg"
                for="slide-{count + 2 <= $products.product.photos.length ? count + 2 : 1}">
                <i class="icon icon-arrow-right" />
              </label>
              <img
                class="img-responsive rounded"
                src={new URL(`carousels/${photo}`, photosUrl)}
                alt={$products.product.titre[lang]} />
            </figure>
          {/each}
        </div>
        <div class="carousel-nav">
          {#each $products.product.photos as photo, count}
            <label class="nav-item text-hide c-hand" for="slide-{count + 1}">
              {count}
            </label>
          {/each}
        </div>
      </div>
    {/if}
    <div class="card-header">
      <div class="card-title h4">{$products.product.titre[lang]}</div>
    </div>
    <div class="card-body">
      <p>
        {$products.product.description[lang]} - {$products.product.poids} g.
      </p>
      <p>Stock : {$products.product.stock}</p>
      <h3 class="card-title h1 price">
        <Price price={$products.product.prix} />
      </h3>
    </div>
    <div class="card-footer">
      <Buy item={$products.product} {lang} />
    </div>
  </div>
{/if}
