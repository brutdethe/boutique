<script>
  import { goto, stores } from "@sapper/app";

  const { page } = stores();

  $: lang = !!$page.path.match("^/en/") ? "en" : "fr";

  function changeLanguageSelected(evt) {
    lang = evt.currentTarget.value;
    const path = $page.path.replace(/^\/(fr|en)\//, `/${lang}/`);
    if (path === "/" && lang !== "fr") {
      goto(`${lang}/`);
      return;
    }
    console.log("path", path === "/" && lang !== "fr");
    goto(path);
  }
</script>

<style>
  .language {
    line-height: 4em;
  }
</style>

<div class="language column col-2">
  <button
    class="btn btn-sm {'en' === lang ? 'bg-secondary' : ''}"
    on:click={changeLanguageSelected}
    value="en">
    En
  </button>
  <button
    class="btn btn-sm {'fr' === lang ? 'bg-secondary' : ''}"
    on:click={changeLanguageSelected}
    value="fr">
    Fr
  </button>
</div>
