<script>
  import { languageSelected } from "../stores.js";
  import Language from "../components/Language.svelte";

  const dict = {
    title: { en: "Jé's little store", fr: "La petite boutique de Jé" }
  };
</script>

<style>
  .title {
    font-size: 2rem;
    font-weight: 700;
    color: #777;
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
</style>

<nav class="columns">
  <ul class="column col-4">
    <li>
      <a href="./produits.json">produits.json</a>
    </li>
    <li>
      <a href="./categories.json">categories.json</a>
    </li>
  </ul>
  <h1 class="title column col-6">
    <a href="/">{dict.title[$languageSelected]}</a>
  </h1>
  <Language />
</nav>
