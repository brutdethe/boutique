<script>
  import { goto } from "@sapper/app";
  import {
    loadProducts,
    languageSelected,
    categorySelected
  } from "../stores.js";

  import Categories from "../components/Categories.svelte";

  const dict = {
    buy: {
      en: "buy",
      fr: "acheter"
    },
    detail: {
      en: "detail",
      fr: "détail"
    },
    currency: {
      en: "$",
      fr: "€"
    }
  };

  let products = loadProducts();

  /*
  products.find = function(query) {
    const properties = Object.getOwnPropertyNames(query);

    function checkQuery(item, query) {
      const result = false;
      if (query.hasOwnProperty("$gt")) {
        return item > query.$gt;
      }
      return item === query;
    }

    return this.filter(item =>
      properties.reduce((acc, prop) => {
        return acc && checkQuery(item[prop], query[prop]);
      }, {})
    ).sort((a, b) => new Date(b.création) - new Date(a.création));
  };
*/
  function detailClick(evt) {
    const id = evt.currentTarget.getAttribute("data-product");
    goto(`/produit-${id}`);
  }
</script>

<style>
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
  <title>La petite boutique de Jé</title>
</svelte:head>

<header>
  <Categories categories={$products.categories} {categorySelected} />

</header>
<section>
  <div class="columns">
    {#if $products.products}
      {#each $products.products as product}
        <div class="column col-4 col-xs-12">
          <article class="card">
            <div class="card-header">
              <div class="card-title h5">
                {product.titre[$languageSelected]} #{product.id}
              </div>
              <div class="card-subtitle text-gray">{$categorySelected}</div>
            </div>
            <div class="card-image">
              <img
                class="img-responsive"
                src="/produits/{product.photos[0]}"
                alt="{product.titre[$languageSelected]} #{product.id}" />
            </div>
            <div class="card-body">
              <p class="description">
                {product.description[$languageSelected]} - {product.poids} g -
              </p>
              <h3 class="price">
                {product.prix} {dict.currency[$languageSelected]}
              </h3>
            </div>
            <div class="card-footer">
              <div class="btn-group btn-group-block">
                <button
                  class="detail btn btn-secondary"
                  on:click|once={detailClick}
                  data-product={product.id}>
                  {dict.detail[$languageSelected]}
                </button>
                <button class="buy btn btn-primary">
                  {dict.buy[$languageSelected]}
                </button>
              </div>
            </div>
          </article>
        </div>
      {/each}
    {/if}
  </div>
</section>
