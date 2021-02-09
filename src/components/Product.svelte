<script>
  import {
    rate,
    loadProducts,
    categorySelected,
    githubDataRepo
  } from "../stores.js";
  import Buy from "../components/Buy.svelte";
  import Price from "../components/Price.svelte";
  import Photo from "../components/Photo.svelte";
  import ProductNotFound from "../components/ProductNotFound.svelte";
  import Loading from "../components/Loading.svelte";

  export let id;
  export let lang;

  let product = loadProducts(id, $rate);

  const dict = {
    title: {
      en: "product",
      fr: "produit"
    },
    weight: {
      en: "Weight",
      fr: "Poids"
    }
  };

  const photosUrl = `https://raw.githubusercontent.com/${$githubDataRepo}/main/`;

  function getWeight(weight, lang) {
    if (lang === "en") {
      return `${(weight * 35.274).toFixed(2)}oz`;
    } else {
      return `${weight * 1000}g`;
    }
  }
</script>

<style>
  .carousel {
    box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
  }

  .carousel .carousel-container::before {
    padding-bottom: 66%;
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
{#if $product}
  {#if $product.hasOwnProperty('id')}
    <div class="card">
      {#if $product.photos.length}
        <div class="card-image carousel">
          {#each $product.photos as photo, count}
            <input
              class="carousel-locator"
              id="slide-{count + 1}"
              type="radio"
              name="carousel-radio"
              hidden="true"
              checked={!count && true} />
          {/each}
          <div class="carousel-container">
            {#each $product.photos as photo, count}
              <figure class="carousel-item">
                <label
                  class="item-prev btn btn-action btn-lg"
                  for="slide-{count ? count : $product.photos.length}">
                  <i class="icon icon-arrow-left" />
                </label>
                <label
                  class="item-next btn btn-action btn-lg"
                  for="slide-{count + 2 <= $product.photos.length ? count + 2 : 1}">
                  <i class="icon icon-arrow-right" />
                </label>
                <Photo
                  alt={`${$product.titre[lang]} #${$product.id}`}
                  {lang}
                  url={`carousels/${photo}`} />

              </figure>
            {/each}
          </div>
          <div class="carousel-nav">
            {#each $product.photos as photo, count}
              <label class="nav-item text-hide c-hand" for="slide-{count + 1}">
                {count}
              </label>
            {/each}
          </div>
        </div>
      {/if}
      <div class="card-header">
        <div class="card-title h4">{$product.titre[lang]}</div>
      </div>
      <div class="card-body">
        <p>{$product.description[lang]}.</p>
        <p>{dict.weight[lang]} : {getWeight($product.poids, lang)}</p>
        <p>Stock : {$product.stock}</p>
        <h3 class="card-title h1 price">
          <Price price={$product.prix} />
        </h3>
      </div>
      <div class="card-footer">
        <Buy item={$product} {lang} />
      </div>
    </div>
  {:else}
    <Loading />
  {/if}
{:else}
  <ProductNotFound {lang} />
{/if}
