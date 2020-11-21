<script>
  import { goto } from "@sapper/app";
  import {
    loadProducts,
    basket,
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
    }
  };

  let products = loadProducts();

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

  function detailClick(evt) {
    const id = evt.currentTarget.getAttribute("data-product");
    goto(`/produit-${id}`);
  }
  function basketClick(evt) {
    const id = evt.currentTarget.getAttribute("data-product");
    basket.set([...$basket, id]);
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
  <Categories categories={$products.categories} />
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
              <div class="card-title h5">
                {product.titre[$languageSelected]} #{product.id}
              </div>
              <div class="card-subtitle text-gray">{$categorySelected}</div>
            </div>
            <div class="card-image">
              <a href="/produit-{product.id}">
                <img
                  class="img-responsive"
                  src="/produits/{product.photos[0]}"
                  alt="{product.titre[$languageSelected]} #{product.id}" />
              </a>
            </div>
            <div class="card-body">
              <p class="description">
                {product.description[$languageSelected]} - {product.poids} g -
              </p>
              <h3 class="price">{product.prix} €</h3>
            </div>
            <div class="card-footer">
              <div class="btn-group btn-group-block">
                <button
                  class="detail btn btn-secondary"
                  on:click|once={detailClick}
                  data-product={product.id}>
                  {dict.detail[$languageSelected]}
                </button>
                <button
                  class="buy btn btn-primary"
                  on:click|once={basketClick}
                  data-product={product.id}>
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
