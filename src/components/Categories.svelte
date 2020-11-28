<script>
  import {
    loadCategories,
    categorySelected,
    languageSelected
  } from "../stores.js";

  export let categories;
  let categoriesWording = loadCategories();

  const changeCategory = evt => categorySelected.set(evt.currentTarget.value);
</script>

<style>
  .hero-body {
    padding: 0.8rem;
    margin-bottom: 0.8rem;
    height: 11em;
    box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
  }
  hr {
    color: #ddd;
  }
  .btn {
    margin: 0.1em;
    box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
  }
</style>

<div class="hero-sm bg-primary">
  <div class="hero-body">
    <h3>{$categorySelected}</h3>
    {#if $categoriesWording[$categorySelected]}
      <p>
        {$categoriesWording[$categorySelected].description[$languageSelected]}
      </p>
    {/if}
  </div>
</div>

{#if categories}
  {#each categories as category}
    <button
      class="btn btn-sm {category === $categorySelected ? 'btn-primary' : ''}"
      on:click={changeCategory}
      value={category}>
      {#if $categoriesWording[category]}
        {$categoriesWording[category].titre[$languageSelected]}
      {/if}
    </button>
  {/each}
{/if}

<hr />
