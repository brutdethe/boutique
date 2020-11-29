<script>
  import { languageSelected } from "../stores.js";
  import AddressForm from "../components/AddressForm.svelte";
  import Address from "../components/displayAddress.svelte";

  const dict = {
    deliveryAddress: {
      en: "Delivery Address",
      fr: "Adresse de livraison"
    }
  };
</script>

<div class="card column col-6 col-xs-12">
  <div class="card-header">
    <div class="card-title h5">{dict.deliveryAddress[$languageSelected]}</div>
  </div>
  <div class="card-body">
    <AddressForm />
  </div>
</div>

<hr />

<Address />
