<script>
  import { goto } from "@sapper/app";
  import {
    rate,
    loadProducts,
    basket,
    pagesPath,
    categorySelected,
    githubDataRepo
  } from "../stores.js";
  import Categories from "../components/Categories.svelte";
  import Buy from "../components/Buy.svelte";
  import Price from "../components/Price.svelte";

  export let lang;

  const dict = {
    title: {
      en: "product's list",
      fr: "liste des produits"
    },
    detail: {
      en: "detail",
      fr: "détail"
    }
  };

  const photosUrl = `https://raw.githubusercontent.com/${$githubDataRepo}/main/`;

  let products = loadProducts(null, $rate);

  function find(products, query) {
    const properties = Object.getOwnPropertyNames(query);

    function checkQuery(item, query) {
      const result = false;
      if (query.hasOwnProperty("$gt")) {
        return item > query.$gt;
      }
      return item === query;
    }

    return products
      .filter(item =>
        properties.reduce((acc, prop) => {
          return acc && checkQuery(item[prop], query[prop]);
        }, {})
      )
      .sort((a, b) => new Date(b.création) - new Date(a.création));
  }

  function basketClick(evt) {
    const id = evt.currentTarget.getAttribute("data-product");
    basket.set([...$basket, id]);
  }
</script>

<style>
  .svg {
    width: 100%;
    text-align: center;
  }
  svg {
    width: 100px;
    height: 100px;
    margin: 20px;
    display: inline-block;
  }

  .description {
    height: 10rem;
  }

  @media (min-width: 1400px) {
    .description {
      height: 6rem;
    }
  }

  .card {
    margin-bottom: 1rem;
    box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
  }

  .price {
    padding-top: 0.8rem;
    text-align: right;
    font-weight: 700;
  }
</style>

<svelte:head>
  <title>{dict.title[lang]}</title>
</svelte:head>
<header>
  <Categories categories={$products.categories} {lang} />
</header>
<section>
  <div class="columns">
    {#if $products.products}
      {#each find($products.products, {
        catégorie: $categorySelected,
        stock: { $gt: 0 }
      }) as product}
        <div class="column col-4 col-xs-12">
          <article class="card">
            <div class="card-header">
              <div class="card-title h5">{product.titre[lang]}</div>
              <div class="card-subtitle text-gray">{$categorySelected}</div>
            </div>
            <div class="card-image">
              <a href="{$pagesPath['product'][lang]}-{product.id}">
                <img
                  class="img-responsive"
                  src={new URL(`thumbs/${product.photos[0]}`, photosUrl)}
                  alt="{product.titre[lang]} #{product.id}" />
              </a>
            </div>
            <div class="card-body">
              <p class="description">{product.description[lang]}</p>
              <h3 class="price">
                <Price price={product.prix} />
              </h3>
            </div>
            <div class="card-footer">
              <div class="btn-group btn-group-block">
                <button
                  class="detail btn btn-secondary"
                  on:click|once={goto(`${$pagesPath['product'][lang]}-${product.id}`)}
                  data-product={product.id}>
                  {dict.detail[lang]}
                </button>
                <Buy item={product} {lang} />
              </div>
            </div>
          </article>
        </div>
      {/each}
    {:else}
      <div class="svg">
        <svg
          version="1.1"
          id="L3"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 0 0"
          xml:space="preserve">
          <circle
            fill="none"
            stroke="#555"
            stroke-width="4"
            cx="50"
            cy="50"
            r="44"
            style="opacity:0.5;" />
          <circle
            fill="#fff"
            stroke="#5755d9"
            stroke-width="3"
            cx="8"
            cy="54"
            r="6">
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 48"
              to="360 50 52"
              repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    {/if}
  </div>
</section>
