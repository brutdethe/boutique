<script>
  import { goto } from "@sapper/app";
  import { basket } from "../stores.js";

  export let lang;

  const stripe_secret =
    "pk_test_51HEFz3GJpQWhfcWwXgkgoLbJ1GLgViXGqYfWSgBQwzudrYdsQiMhdVkGWHQvRPx3sTMLNsRXvB2B6pdF1GEpQ9Ka00kz6AoFmS";

  function checkout() {
    const stripe = Stripe(stripe_secret);
    const data = {
      basket: $basket,
      language: lang,
      shipping: transport
    };

    fetch("/server/checkout-session-id", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => {
        r.json().then(result =>
          stripe.redirectToCheckout({ sessionId: result.session.id })
        );
      })
      .catch(err => {
        console.log("POST error", err.message);
      });
  }

  function shippingCost(basket, language) {
    const collisimo = {
      fr: [
        { limit: 0.25, price: 4.95 },
        { limit: 0.5, price: 6.45 },
        { limit: 0.75, price: 7.35 },
        { limit: 1, price: 7.99 },
        { limit: 2, price: 9.15 },
        { limit: 5, price: 14.1 },
        { limit: 10, price: 20.5 },
        { limit: 15, price: 26.0 },
        { limit: 30, price: 32.2 }
      ],
      en: [
        { limit: 0.5, price: 28.1 },
        { limit: 1, price: 31.35 },
        { limit: 2, price: 42.95 },
        { limit: 5, price: 62.9 },
        { limit: 10, price: 118.9 },
        { limit: 15, price: 169.0 },
        { limit: 20, price: 206.0 }
      ]
    };
    const weightTotal = basket.reduce(
      (acc, product) => product.poids * product.qty + acc,
      0
    );

    return collisimo[language].filter(rate => weightTotal <= rate.limit)[0]
      .price;
    transport;
  }

  $: subTotal = parseFloat(
    $basket
      .reduce((acc, product) => product.prix * product.qty + acc, 0)
      .toFixed(2)
  ).toFixed(2);
  $: transport = parseFloat(shippingCost($basket, lang)).toFixed(2);
  $: total = parseFloat(+transport + +subTotal).toFixed(2);

  function deleteClick(id) {
    $basket = $basket.filter(product => product.id !== id);
  }

  const dict = {
    title: { en: "Summary of purchases", fr: "Récapitulatif des achats" },
    empty: {
      en: "There are no items in your shopping cart yet.",
      fr: "Il n'y a pas encore d'article dans votre panier."
    },
    backToShop: {
      en: "back to the store",
      fr: "revenir dans la boutique"
    },
    product: {
      en: "item",
      fr: "produit"
    },
    price: {
      en: "price",
      fr: "prix"
    },
    qty: {
      en: "qty",
      fr: "qté"
    },
    total: {
      en: "total",
      fr: "total"
    },
    order: {
      en: "Placing the order",
      fr: "Passez la commande"
    }
  };
</script>

<style>
  table {
    margin: 1rem 0;
  }
  .card {
    box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
  }
  .form-input {
    width: 3.5em;
  }
</style>

<svelte:head>
  <script src="https://js.stripe.com/v3/">

  </script>
  <title>{dict.title[lang]}</title>
</svelte:head>

<h2>{dict.title[lang]}</h2>

<div class="container">
  <div class="columns">
    {#if $basket.length}
      <table class="table table-striped table-hover column col-8">
        <thead>
          <tr>
            <th>{dict.product[lang]}</th>
            <th />
            <th>{dict.price[lang]}</th>
            <th>{dict.qty[lang]}</th>
            <th>{dict.total[lang]}</th>
          </tr>
        </thead>
        <tbody>
          {#each $basket as item, index}
            <tr class="active">
              <td>{item.titre[lang]} - {item.id}</td>
              <td>
                <i
                  class="icon icon-delete c-hand"
                  on:click|once={deleteClick(item.id)} />
              </td>
              <td>{item.prix} €</td>
              <td>
                {#if item.stock > 1}
                  <input
                    class="form-input"
                    type="number"
                    bind:value={item.qty}
                    min="1"
                    max={item.stock} />
                {:else}{item.qty}{/if}
              </td>
              <td>{item.prix * item.qty} €</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <article class="card">
        <div class="card-header">
          <div class="card-title h5">Ticket</div>
        </div>
        <div class="card-body">
          <table class="table">
            <tbody>
              <tr>
                <td>S/Total</td>
                <td class="text-right">{subTotal} €</td>
              </tr>
              <tr>
                <td>Transport</td>
                <td class="text-right">{transport} €</td>
              </tr>
              <tr class="active">
                <td class="text-bold">Total</td>
                <td class="text-right text-bold">{total} €</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div class="card-footer">
          <button
            id="checkout-button"
            class="btn btn-success"
            on:click|once={checkout}>
            {dict.order[lang]}
          </button>
        </div>
      </article>
    {:else}
      <div class="empty column col-12">
        <div class="empty-icon">
          <i class="icon icon-stop" />
        </div>
        <p class="empty-title h5">{dict.empty[lang]}</p>
        <div class="empty-action">
          <a href="/" class="back-shop">&lsaquo; {dict.backToShop[lang]}</a>
        </div>
      </div>
    {/if}
  </div>
</div>
{#if $basket.length}
  <a href="/" class="back-shop">&lsaquo; {dict.backToShop[lang]}</a>
{/if}
