<script>
  import { languageSelected } from "../stores.js";

  const changeLanguageSelected = evt =>
    languageSelected.set(evt.currentTarget.value);
</script>

<style>
  .form-group {
    line-height: 4em;
  }
</style>

<div class="form-group column col-1 ">
  <label class="form-radio form-inline">
    <input
      type="radio"
      bind:group={$languageSelected}
      on:change={changeLanguageSelected}
      value="en" />
    <i class="form-icon" />
    EN
  </label>
  <label class="form-radio form-inline">
    <input
      type="radio"
      bind:group={$languageSelected}
      on:change={changeLanguageSelected}
      value="fr" />
    <i class="form-icon" />
    FR
  </label>
</div>
