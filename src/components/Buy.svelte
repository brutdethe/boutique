<script>
  import { basket, languageSelected } from "../stores.js";

  export let item;

  $: stock = calculStock();

  function calculStock() {
    const basketItem = $basket.filter(product => product.id === item.id);
    if (basketItem[0]) {
      console.log("+item.stock", +item.stock);
      console.log("+item.qty", basketItem[0]);
      return +item.stock - +basketItem[0].qty;
    } else {
      console.log("+item.stock", +item.stock);
      console.log("+item.qty", basketItem[0]);
      return item.stock;
    }
  }

  function basketClick() {
    if ($basket.filter(product => product.id === item.id).length) {
      // modify a product
      basket.set(
        $basket.map(product => {
          if (product.id === item.id) {
            product.qty++;
            product.stock--;
          }
          return product;
        })
      );
    } else {
      // create a product
      item.qty = item.qty ? item.qty++ : 1;
      item.stock--;
      basket.set([...$basket, item]);
    }
    stock = calculStock();
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
  data-badge={stock}
  on:click|once={basketClick}>
  {dict.buy[$languageSelected]}
</button>
