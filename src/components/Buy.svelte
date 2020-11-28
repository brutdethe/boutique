<script>
  import { basket, languageSelected } from "../stores.js";

  export let item;

  function basketClick() {
    if (!$basket.filter(product => product.id === item.id).length) {
      // create a product
      item.qty = item.qty ? item.qty++ : 1;
      basket.set([...$basket, item]);
    }
  }

  const dict = {
    buy: {
      en: "buy",
      fr: "acheter"
    }
  };
</script>

<button class="btn btn-primary float-right" on:click|once={basketClick}>
  {dict.buy[$languageSelected]}
</button>
