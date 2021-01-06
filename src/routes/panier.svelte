<script>
  import { goto } from "@sapper/app";
  import { basket, languageSelected } from "../stores.js";

  const stripe_secret =
    "pk_test_51HEFz3GJpQWhfcWwXgkgoLbJ1GLgViXGqYfWSgBQwzudrYdsQiMhdVkGWHQvRPx3sTMLNsRXvB2B6pdF1GEpQ9Ka00kz6AoFmS";

  function checkout() {
    const stripe = Stripe(stripe_secret);
    const data = {
      basket: $basket,
      language: $languageSelected,
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

  let transport = 8;

  $: subTotal = $basket.reduce(
    (acc, product) => product.prix * product.qty + acc,
    0
  );

  $: total = subTotal + transport;

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
  <title>{dict.title[$languageSelected]}</title>
</svelte:head>

<h2>{dict.title[$languageSelected]}</h2>

<div class="container">
  <div class="columns">
    {#if $basket.length}
      <table class="table table-striped table-hover column col-8">
        <thead>
          <tr>
            <th>{dict.product[$languageSelected]}</th>
            <th />
            <th>{dict.price[$languageSelected]}</th>
            <th>{dict.qty[$languageSelected]}</th>
            <th>{dict.total[$languageSelected]}</th>
          </tr>
        </thead>
        <tbody>
          {#each $basket as item, index}
            <tr class="active">
              <td>{item.titre[$languageSelected]} - {item.id}</td>
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
            {dict.order[$languageSelected]}
          </button>
        </div>
      </article>
    {:else}
      <div class="empty column col-12">
        <div class="empty-icon">
          <i class="icon icon-stop" />
        </div>
        <p class="empty-title h5">{dict.empty[$languageSelected]}</p>
        <div class="empty-action">
          <a href="/" class="back-shop">
            &lsaquo; {dict.backToShop[$languageSelected]}
          </a>
        </div>
      </div>
    {/if}
  </div>
</div>
{#if $basket.length}
  <a href="/" class="back-shop">
    &lsaquo; {dict.backToShop[$languageSelected]}
  </a>
{/if}
