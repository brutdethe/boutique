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
  import { lang } from "../stores.js";
  import Language from "../components/Language.svelte";
  export let items;

  let category = "Gaiwan";

  const dict = {
    buy: {
      en: "buy",
      fr: "acheter"
    },
    currency: {
      en: "$",
      fr: "€"
    },
    categoriesText: {
      Gaiwan: {
        en: "The gaiwan or zhong is the ideal utensil.",
        fr: "Le gaiwan ou zhong, est l'ustensile idéal"
      },
      Théière: {
        en:
          "Each teapot I make represents a unique piece in which I am involved and apply myself.",
        fr:
          "Chaque théière que je fabrique, représente une pièce unique dans laquelle je m'implique et je m'applique."
      },
      Tasse: {
        en: "Without a cup we couldn't drink tea.",
        fr: "Sans tasse on ne pourrait pas boire le thé."
      },
      Shiboridashi: {
        en:
          'Shiboridashi are Japanese infusers, mainly intended for the infusion of "gyokuro" (green tea particularly rich in taste).',
        fr:
          "Les shiboridashi sont des infuseurs japonais, principalement destinés à l'infusion des « gyokuro » (thé vert particulièrement riche en goût.)"
      },
      Kyusu: {
        en:
          "If I stop at the shape of this teapot, there are no apparent difficulties in its realization. That said, there are many subtleties that make this teapot a particularly demanding piece.",
        fr:
          "Si je m’arrête à la forme de cette théière, il n'y a pas de difficultés apparentes dans sa réalisation. Ceci dit, cette pièce renferme de multiples subtilités, qui font de cette théière une pièce particulièrement exigeante."
      }
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

  hr {
    color: #ddd;
  }

  .card {
    margin-bottom: 1rem;
    box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
  }

  .hero-body {
    padding: 0.8rem;
    margin-bottom: 0.8rem;
  }

  .price {
    padding-top: 0.8rem;
    text-align: right;
  }
</style>

<svelte:head>
  <title>La petite boutique de Jé</title>
</svelte:head>

<header>
  <Language />
  <label>
    <input type="radio" bind:group={category} value="Tasse" />
    Tasse
  </label>
  <label>
    <input type="radio" bind:group={category} value="Gaiwan" />
    Gaiwan
  </label>
  <label>
    <input type="radio" bind:group={category} value="Théière" />
    Théière
  </label>
  <label>
    <input type="radio" bind:group={category} value="Shiboridashi" />
    Shiboridashi
  </label>
  <label>
    <input type="radio" bind:group={category} value="Kyusu" />
    Kyusu
  </label>
  <hr />
</header>
<section>
  <div class="hero-sm bg-dark">
    <div class="hero-body">
      <h3>{category}</h3>
      <p>{dict.categoriesText[category][$lang]}</p>
    </div>
  </div>
  <div class="columns">
    {#each items.find({ catégorie: category, stock: { $gt: 0 } }) as item}
      <div class="column col-4 col-xs-12">
        <article class="card">
          <div class="card-header">
            <div class="card-title h5">{item.titre[$lang]}</div>
            <div class="card-subtitle text-gray">{category}</div>
          </div>
          <div class="card-image">
            <img
              class="img-responsive"
              src="/produits/{item.photos}"
              alt={item.titre[$lang]} />
          </div>
          <div class="card-body">
            <p class="description">
              {item.description[$lang]} - {item.poids} g -
            </p>
            <h3 class="price">{item.prix} {dict.currency[$lang]}</h3>
          </div>
          <div class="card-footer">
            <div class="btn-group btn-group-block">
              <button class="btn btn-primary">{dict.buy[$lang]}</button>
            </div>
          </div>
        </article>
      </div>
    {/each}
  </div>
</section>
