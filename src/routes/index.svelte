<script context="module">
  export async function preload() {
    const res = await this.fetch("./produits.json");
    const data = await res.json();

    if (res.status === 200) {
      return { items: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { language, category } from "../stores.js";
  import Categories from "../components/Categories.svelte";
  export let items;

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

  items.find = function(query) {
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

  function detailClick() {
    alert("no more alerts");
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
  <Categories />
</header>
<section>
  <div class="columns">
    {#each items.find({ catégorie: $category, stock: { $gt: 0 } }) as item}
      <div class="column col-4 col-xs-12">
        <article class="card">
          <div class="card-header">
            <div class="card-title h5">{item.titre[$language]}</div>
            <div class="card-subtitle text-gray">{$category}</div>
          </div>
          <div class="card-image">
            <img
              class="img-responsive"
              src="/produits/{item.photos}"
              alt={item.titre[$language]} />
          </div>
          <div class="card-body">
            <p class="description">
              {item.description[$language]} - {item.poids} g -
            </p>
            <h3 class="price">{item.prix} {dict.currency[$language]}</h3>
          </div>
          <div class="card-footer">
            <div class="btn-group btn-group-block">
              <button
                class="detail btn btn-secondary"
                on:click|once={detailClick}>
                {dict.detail[$language]}
              </button>
              <button class="buy btn btn-primary">{dict.buy[$language]}</button>
            </div>
          </div>
        </article>
      </div>
    {/each}
  </div>
</section>
