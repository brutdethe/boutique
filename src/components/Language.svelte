<script>
  import { languageSelected } from "../stores.js";

  const changeLanguageSelected = evt => lang.set(evt.currentTarget.value);
</script>

<article>
  <label>
    <input
      type="radio"
      bind:group={$languageSelected}
      on:change={changeLanguageSelected}
      value="en" />
    EN
  </label>
  <label>
    <input
      type="radio"
      bind:group={$languageSelected}
      on:change={changeLanguageSelected}
      value="fr" />
    FR
  </label>
</article>
