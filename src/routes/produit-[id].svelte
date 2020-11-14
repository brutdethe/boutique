<script context="module">
  export async function preload(page) {
    const id = page.params.id;
    const res = await this.fetch("./produits.json");
    const data = await res.json();

    if (res.status === 200) {
      const item = data.filter(item => +item.id === +id)[0];
      return { item: item, items: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { language, category } from "../stores.js";

  export let item;

  const dict = {
    buy: {
      en: "buy",
      fr: "acheter"
    }
  };
</script>

<svelte:head>
  <title>{item.titre[$language]}</title>
</svelte:head>

<h1>{item.titre[$language]} #{item.id}</h1>
<ul>
  <li>description: {item.description[$language]}</li>
  <li>prix: {item.prix}</li>
  <li>poids: {item.poids}</li>
  <li>stock: {item.stock}</li>
  {#if item.stock}
    <li>
      <button class="buy btn btn-primary">{dict.buy[$language]}</button>
    </li>
  {/if}
  {#each item.photos as photo}
    <li>
      <img src="/produits/{photo}" alt={item.titre[$language]} />
    </li>
  {/each}
</ul>
