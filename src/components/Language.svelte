<script>
  import { languageSelected } from "../stores.js";

  const changeLanguageSelected = evt =>
    languageSelected.set(evt.currentTarget.value);
</script>

<style>
  .language {
    line-height: 4em;
  }
</style>

<div class="language column col-2">
  <button
    class="btn btn-sm {'en' === $languageSelected ? 'bg-secondary' : ''}"
    on:click={changeLanguageSelected}
    value="en">
    En
  </button>
  <button
    class="btn btn-sm {'fr' === $languageSelected ? 'bg-secondary' : ''}"
    on:click={changeLanguageSelected}
    value="fr">
    Fr
  </button>
</div>
