<script>
  import { currency } from "../stores.js";

  function changeCurrencySelected(evt) {
    currency.set($currency === "€" ? "$" : "€");
  }
</script>

<style>
  .currency {
    line-height: 4em;
  }
</style>

<div class="currency column col-1">
  <button
    class="btn btn-sm {'€' === $currency ? 'bg-secondary' : ''}"
    on:click={changeCurrencySelected}
    value="€">
    EUR
  </button>
  <button
    class="btn btn-sm {'$' === $currency ? 'bg-secondary' : ''}"
    on:click={changeCurrencySelected}
    value="$">
    USD
  </button>
</div>
