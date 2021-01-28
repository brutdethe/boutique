<script>
  import { basket } from "../stores.js";

  export let item;
  export let lang;

  const getBasketProduct = id =>
    $basket.filter(product => product.id === id)[0];

  $: disabled = getBasketProduct(item.id) ? true : false;

  function basketClick(item) {
    if (getBasketProduct(item.id) === undefined) {
      item.qty = 1;
      $basket = [...$basket, item];
      disabled = true;
    }
  }

  const dict = {
    buy: {
      en: "buy",
      fr: "acheter"
    }
  };
</script>

<button
  class="btn btn-primary float-right"
  on:click={basketClick(item)}
  {disabled}>
  {dict.buy[lang]}
</button>
