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
</style>

<svelte:head>
  <title>La petite boutique de Jé</title>
</svelte:head>

<h1>La petite boutique de Jé</h1>

<section class="container">
  <h2>Liste des produits</h2>
  <table>
    <thead>
      <tr>
        <th>Catégorie</th>
        <th>Titre</th>
        <th>Poids</th>
        <th>Prix</th>
        <th>Stock</th>
      </tr>
    </thead>
    <tbody>
      {#each items as item}
        <tr>
          <td>{item.catégorie}</td>
          <td>{item.titre}</td>
          <td>{item.poids}</td>
          <td>{item.prix}</td>
          <td>{item.stock}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
