<script>
  import { basket, languageSelected } from "../stores.js";

  export let item;

  function basketClick(evt) {
    const id = evt.currentTarget.getAttribute("data-product");
    basket.set([...$basket, item]);
  }

  const dict = {
    buy: {
      en: "buy",
      fr: "acheter"
    }
  };
</script>

<button
  class="btn btn-primary badge float-right"
  data-badge={item.stock}
  on:click|once={basketClick}>
  {dict.buy[$languageSelected]}
</button>
