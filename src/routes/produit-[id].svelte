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
</script>

<svelte:head>
  <title>{item.category - item.titre}</title>
</svelte:head>

<h1>{item.titre[$language]} #{item.id}</h1>
<ul>
  <li>description: {item.description[$language]}</li>
  <li>prix: {item.prix}</li>
  <li>poids: {item.poids}</li>
  <li>photos: {item.photos}</li>
</ul>
