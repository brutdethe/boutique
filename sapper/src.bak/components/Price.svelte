<script>
  import { currency } from "../stores.js";

  export let price;
  export let qty = 1;

  $: result = parseFloat(price[$currency] * qty).toFixed(2);
</script>

{result} {$currency === 'EUR' ? '€' : '$'}
