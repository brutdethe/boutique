<script>
  import { lang } from "../stores.js";

  export let segment;

  const dict = {
    title: { en: "Jé's little store", fr: "La petite boutique de Jé" }
  };
</script>

<style>
  .title {
    font-size: 2.3rem;
    font-weight: 700;
    color: #777;
    line-height: 4rem;
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

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<nav class="columns">
  <ul class="column col-4">
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href="./produits.json">
        produits.json
      </a>
    </li>
  </ul>
  <h1 class="title column col-6">{dict.title[$lang]}</h1>
</nav>
