<script>
  import { categorySelected, languageSelected } from "../stores.js";

  const categories = ["Gaiwan", "Théière", "Shiboridashi", "Kyusu"];
  const changeCategory = evt => category.set(evt.currentTarget.value);
</script>

<style>
  .hero-body {
    padding: 0.8rem;
    margin-bottom: 0.8rem;
  }
  hr {
    color: #ddd;
  }
</style>

{#each categories as category}
  <label>
    <input
      type="radio"
      bind:group={$categorySelected}
      on:change={changeCategory}
      value={category} />
    {category}
  </label>
{/each}

<hr />

<div class="hero-sm bg-dark">
  <div class="hero-body">
    <h3>{$categorySelected}</h3>
    <p />
  </div>
</div>
