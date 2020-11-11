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

  let category = "Gaiwan";

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
  }

  h1 {
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 2em;
    }
  }
  hr {
    color: #ccc;
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
  <h2>Liste des produits</h2>
  <table>
    <thead>
      <tr>
        <th>Titre</th>
        <th>Poids</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      {#each items.find({ catégorie: category, stock: { $gt: 0 } }) as item}
        <tr>
          <td>{item.titre}</td>
          <td>{item.poids} g</td>
          <td>{item.prix} €</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
