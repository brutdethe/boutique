<script>
  import { onMount } from "svelte";

  let stripeReady = false;
  let mounted = false;

  function stripeSourceHandler(source) {
    // Redirect the customer to the authorization URL.
    document.location.href = source.redirect.url;
  }

  onMount(() => {
    mounted = true;

    loadStripeElements();
  });

  function stripeLoaded() {
    stripeReady = true;
    if (mounted) {
      loadStripeElements();
    }
  }

  function loadStripeElements() {
    // await sleep(500);
    // Create a Stripe client.
    // Note: this merchant has been set up for demo purposes.
    const stripe = Stripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        padding: "10px 12px",
        color: "#32325d",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a"
      }
    };

    // Create an instance of the idealBank Element.
    var idealBank = elements.create("idealBank", { style: style });

    // Add an instance of the idealBank Element into the `ideal-bank-element` <div>.
    idealBank.mount("#ideal-bank-element");

    var errorMessage = document.getElementById("error-message");

    // Handle form submission.
    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      var sourceData = {
        type: "ideal",
        amount: 1099,
        currency: "eur",
        owner: {
          name: document.querySelector('input[name="name"]').value
        },
        // Specify the URL to which the customer should be redirected
        // after paying.
        redirect: {
          return_url: "https://shop.brutdethé.fr/stripe-back"
        }
      };

      // Call `stripe.createSource` with the idealBank Element and additional options.
      stripe.createSource(idealBank, sourceData).then(function(result) {
        if (result.error) {
          // Inform the customer that there was an error.
          errorMessage.textContent = result.error.message;
          errorMessage.classList.add("visible");
          stopLoading();
        } else {
          // Redirect the customer to the authorization URL.
          errorMessage.classList.remove("visible");
          stripeSourceHandler(result.source);
        }
      });
    });
  }
</script>

<style>
  #payment-form :global(input, .StripeElement) {
    height: 40px;

    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  #payment-form :global(input) {
    padding: 10px 12px;
  }

  #payment-form :global(input:focus, .StripeElement--focus) {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  #payment-form :global(.StripeElement--invalid) {
    border-color: #fa755a;
  }

  #payment-form :global(button) {
    height: 40px;
    width: 100%;
    margin-top: 40px;
    background: #32325d;
    color: #fff;
    font-weight: 600;
  }
</style>

<svelte:head>
  <script src="https://js.stripe.com/v3/" on:load={stripeLoaded}>

  </script>
</svelte:head>

<form id="payment-form">
  <div class="form-row">
    <label for="name">Name</label>
    <input id="name" name="name" placeholder="Jenny Rosen" required />
  </div>

  <div class="form-row">
    <label for="ideal-bank-element">iDEAL Bank</label>
    <div id="ideal-bank-element">
      <!-- A Stripe Element will be inserted here. -->
    </div>
  </div>
  <script src="https://js.stripe.com/v3/">

  </script>
  <button>Submit Payment</button>

  <!-- Used to display form errors. -->
  <div id="error-message" role="alert" />
</form>
