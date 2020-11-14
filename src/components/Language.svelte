<script>
  import { lang } from "../stores.js";

  const changeLanguage = evt => lang.set(evt.currentTarget.value);
</script>

<hr />
<label>
  <input
    type="radio"
    bind:group={$lang}
    on:change={changeLanguage}
    value="en" />
  English
</label>
<label>
  <input
    type="radio"
    bind:group={$lang}
    on:change={changeLanguage}
    value="fr" />
  Français
</label>
<hr />
