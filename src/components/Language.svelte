<script>
  import { language } from "../stores.js";

  const changeLanguage = evt => lang.set(evt.currentTarget.value);
</script>

<article>
  <label>
    <input
      type="radio"
      bind:group={$language}
      on:change={changeLanguage}
      value="en" />
    EN
  </label>
  <label>
    <input
      type="radio"
      bind:group={$language}
      on:change={changeLanguage}
      value="fr" />
    FR
  </label>
</article>
