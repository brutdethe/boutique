<script>
  import { stores } from "@sapper/app";
  import { basket, pagesPath } from "../stores.js";
  import Currency from "../components/Currency.svelte";
  import Language from "../components/Language.svelte";

  const { page } = stores();

  export let segment;

  $: lang = !!$page.path.match("^/en/") ? "en" : "fr";

  const dict = {
    title: { en: "Jé le potier", fr: "Jé le potier" },
    nav_products: { en: "shop", fr: "boutique" },
    nav_about: { en: "about", fr: "à propos" },
    nav_basket: { en: "basket", fr: "panier" }
  };

  const basketCount = basket =>
    basket.reduce((acc, product) => product.qty + acc, 0);
</script>

<style>
  .title {
    line-height: 1.5em;
    font-size: 2rem;
    font-weight: 700;
    color: #5755d9;
  }

  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }
</style>

<nav class="columns">
  <ul class="column col-4">
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href={$pagesPath.index[lang]}>
        {dict.nav_products[lang]}
      </a>
    </li>
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href={$pagesPath.about[lang]}>
        {dict.nav_about[lang]}
      </a>
    </li>
    <li>
      <a
        aria-current={segment === 'panier' ? 'page' : undefined}
        href={$pagesPath.basket[lang]}>
        <span class="badge" data-badge={basketCount($basket)} data-initial="YZ">
          {dict.nav_basket[lang]}
        </span>
      </a>
    </li>
  </ul>
  <h1 class="title column col-5">{dict.title[lang]}</h1>
  <Currency />
  <Language />
</nav>
