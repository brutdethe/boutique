<script>
  export let lang;

  const dict = {
    message: {
      en: "Unless otherwise stated, this product is no longer in stock.",
      fr: "Apparement, ce produit n'est plus en stock."
    },
    backToShop: {
      en: "back to the store",
      fr: "revenir dans la boutique"
    }
  };
</script>

<div class="container">
  <div class="columns">
    <div class="empty column col-12">
      <div class="empty-icon">
        <i class="icon icon-fail" />
      </div>
      <p class="empty-title h5">{dict.message[lang]}</p>
      <div class="empty-action">
        <a href={lang === 'fr' ? '.' : `${lang}/`} class="back-shop">
          &lsaquo; {dict.backToShop[lang]}
        </a>
      </div>
    </div>
  </div>
</div>
