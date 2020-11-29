<script>
  import { address } from "../stores.js";
</script>

<div class="hero bg-gray">
  <div class="hero-body">
    <h3>Adresse de livraison :</h3>
    {#if $address.livraison}
      <ul>
        {#each Object.keys($address.livraison) as key}
          <li>
            <strong>{key}:</strong>
            {$address.livraison[key]}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
