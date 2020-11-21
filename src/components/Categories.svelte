<script>
  import {
    loadCategories,
    categorySelected,
    languageSelected
  } from "../stores.js";

  export let categories;
  let categoriesDescription = loadCategories();

  const changeCategory = evt => categorySelected.set(evt.currentTarget.value);
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

<div class="hero-sm bg-dark">
  <div class="hero-body">
    <h3>{$categorySelected}</h3>
    {#if $categoriesDescription[$categorySelected]}
      <p>{$categoriesDescription[$categorySelected][$languageSelected]}</p>
    {/if}
  </div>
</div>

{#if categories}
  <div class="form-group">
    |
    {#each categories as category}
      <label class="form-radio form-inline">
        <input
          type="radio"
          bind:group={$categorySelected}
          on:change={changeCategory}
          value={category} />
        <i class="form-icon" />
        {category} |
      </label>
    {/each}
  </div>
{/if}

<hr />
