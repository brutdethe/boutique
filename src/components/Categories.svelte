<script>
  export let categories, categorySelected;

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

{#if categories}
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
{/if}

<hr />

<div class="hero-sm bg-dark">
  <div class="hero-body">
    <h3>{$categorySelected}</h3>
    <p />
  </div>
</div>
