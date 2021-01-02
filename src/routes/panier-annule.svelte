<script>
  import { languageSelected } from "../stores.js";
  const dict = {
    title: { en: "Cancel purchases", fr: "Achats annulés" },
    message: {
      en: "Your purchases have not been taken into account.",
      fr: "Vos achats n'ont pas été pris en compte."
    },
    backToShop: {
      en: "back to the store",
      fr: "revenir dans la boutique"
    }
  };
</script>

<svelte:head>
  <title>{dict.title[$languageSelected]}</title>
</svelte:head>
<h2>{dict.title[$languageSelected]}</h2>

<div class="container">
  <div class="columns">
    <div class="empty column col-12">
      <div class="empty-icon">
        <i class="icon icon-stop" />
      </div>
      <p class="empty-title h5">{dict.message[$languageSelected]}</p>
      <div class="empty-action">
        <a href="/" class="back-shop">
          &lsaquo; {dict.backToShop[$languageSelected]}
        </a>
      </div>
    </div>
  </div>
</div>
