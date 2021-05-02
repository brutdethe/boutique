<script>
  import { country } from "../stores.js";
  const countries = [
    { id: "france", text: "France" },
    { id: "international", text: "International" },
    { id: "europe", text: "Europe" }
  ];
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select bind:value={$country}>
  {#each countries as country}
    <option value={country.id}>{country.text}</option>
  {/each}
</select>
