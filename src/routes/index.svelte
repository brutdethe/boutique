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
  export let items;

  let lang = "fr";
  let category = "Gaiwan";

  const dict = {
    title: { en: "Jé's little store", fr: "La petite boutique de Jé" },
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
  h1 {
    text-align: center;
    margin: 0 auto;
    text-transform: uppercase;
    font-weight: 700;
    color: #666;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 2em;
    }
  }

  hr {
    color: #ddd;
  }

  .card {
    margin-bottom: 0.8rem;
  }

  .hero-body {
    padding: 0.8rem;
    margin-bottom: 0.8rem;
  }
</style>

<svelte:head>
  <title>La petite boutique de Jé</title>
</svelte:head>

<h1>{dict.title[lang]}</h1>

<section class="container">
  <hr />
  <label>
    <input type="radio" bind:group={lang} value="en" />
    English
  </label>
  <label>
    <input type="radio" bind:group={lang} value="fr" />
    Français
  </label>
  <hr />
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
  <hr />
  <div class="hero-sm bg-gray">
    <div class="hero-body">
      <h3>{category}</h3>
      <p>{dict.categoriesText[category][lang]}</p>
    </div>
  </div>
  <div class="docs-demo columns">
    {#each items.find({ catégorie: category, stock: { $gt: 0 } }) as item}
      <div class="column col-6 col-xs-12">
        <div class="card">
          <div class="card-header">
            <div class="card-title h5">{item.titre[lang]}</div>
            <div class="card-subtitle text-gray">{category}</div>
          </div>
          <div class="card-image">
            <img
              class="img-responsive"
              src="/produits/{item.photos}"
              alt={item.titre[lang]} />
          </div>
          <div class="card-body">
            {item.description[lang]} - {item.poids} g -
            <h3>{item.prix} {dict.currency[lang]}</h3>
          </div>
          <div class="card-footer">
            <div class="btn-group btn-group-block">
              <button class="btn btn-primary">{dict.buy[lang]}</button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
