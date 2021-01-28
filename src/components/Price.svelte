<script>
  import { currency } from "../stores.js";

  export let price;
  export let qty = 1;

  $: rate = $currency === "€" ? 1 : 1.28;
  $: result = parseFloat(Math.ceil(price * rate) * qty).toFixed(2);
</script>

{result} {$currency}
