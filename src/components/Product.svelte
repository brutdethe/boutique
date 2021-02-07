<script>
  import {
    rate,
    loadProducts,
    categorySelected,
    githubDataRepo
  } from "../stores.js";
  import Buy from "../components/Buy.svelte";
  import Price from "../components/Price.svelte";

  export let id;
  export let lang;

  let products = loadProducts(id, $rate);

  const dict = {
    title: {
      en: "product",
      fr: "produit"
    },
    message: {
      en: "Unless otherwise stated, this product is no longer in stock.",
      fr: "Apparement, ce produit n'est plus en stock."
    },
    weight: {
      en: "Weight",
      fr: "Poids"
    },
    backToShop: {
      en: "back to the store",
      fr: "revenir dans la boutique"
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
{#if $products.id}
  <div class="card">
    {#if $products.photos.length}
      <div class="card-image carousel">
        {#each $products.photos as photo, count}
          <input
            class="carousel-locator"
            id="slide-{count + 1}"
            type="radio"
            name="carousel-radio"
            hidden="true"
            checked={!count && true} />
        {/each}
        <div class="carousel-container">
          {#each $products.photos as photo, count}
            <figure class="carousel-item">
              <label
                class="item-prev btn btn-action btn-lg"
                for="slide-{count ? count : $products.photos.length}">
                <i class="icon icon-arrow-left" />
              </label>
              <label
                class="item-next btn btn-action btn-lg"
                for="slide-{count + 2 <= $products.photos.length ? count + 2 : 1}">
                <i class="icon icon-arrow-right" />
              </label>
              <img
                class="img-responsive rounded"
                src={new URL(`carousels/${photo}`, photosUrl)}
                alt={$products.titre[lang]} />
            </figure>
          {/each}
        </div>
        <div class="carousel-nav">
          {#each $products.photos as photo, count}
            <label class="nav-item text-hide c-hand" for="slide-{count + 1}">
              {count}
            </label>
          {/each}
        </div>
      </div>
    {/if}
    <div class="card-header">
      <div class="card-title h4">{$products.titre[lang]}</div>
    </div>
    <div class="card-body">
      <p>{$products.description[lang]}.</p>
      <p>{dict.weight[lang]} : {getWeight($products.poids, lang)}</p>
      <p>Stock : {$products.stock}</p>
      <h3 class="card-title h1 price">
        <Price price={$products.prix} />
      </h3>
    </div>
    <div class="card-footer">
      <Buy item={$products} {lang} />
    </div>
  </div>
{:else}
  <div class="container">
    <div class="columns">
      <div class="empty column col-12">
        <div class="empty-icon">
          <i class="icon icon-fail" />
        </div>
        <p class="empty-title h5">{dict.message[lang]}</p>
        <div class="empty-action">
          <a href={lang === 'fr' ? '.' : `${lang}/`} class="back-shop">
            &lsaquo; {dict.backToShop[lang]}
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}
