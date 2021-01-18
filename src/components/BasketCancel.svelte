<script>
  export let lang;

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
  <title>{dict.title[lang]}</title>
</svelte:head>
<h2>{dict.title[lang]}</h2>

<div class="container">
  <div class="columns">
    <div class="empty column col-12">
      <div class="empty-icon">
        <i class="icon icon-stop" />
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
