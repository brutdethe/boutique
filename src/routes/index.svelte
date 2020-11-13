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
  const lang = "fr";
  export let items;

  let category = "Gaiwan";

  const categoriesText = {
    Gaiwan: "Le gaiwan ou zhong, est l'ustensile idéal",
    Théière:
      "Chaque théière que je fabrique, représente une pièce unique dans laquelle je m'implique et je m'applique.",
    Tasse: "Sans tasse on ne pourrait pas boire le thé."
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

<h1>La petite boutique de Jé</h1>

<section class="container">
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
      <p>{categoriesText[category]}</p>
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
            <h3>{item.prix} €</h3>
          </div>
          <div class="card-footer">
            <div class="btn-group btn-group-block">
              <button class="btn btn-primary">Acheter</button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
