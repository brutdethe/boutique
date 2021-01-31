<script>
  import { stores } from "@sapper/app";

  const { page } = stores();

  export let segment;

  $: lang = !!$page.path.match("^/en/") ? "en" : "fr";

  const dict = {
    legal: { en: "publisher", fr: "mentions légales" },
    legalPage: { en: "publisher", fr: "mentions-legales" },
    privacy: { en: "privacy", fr: "confidentialité" },
    privacyPage: { en: "privacy", fr: "confidentialite" },
    terms: { en: "terms&conditions", fr: "conditions générales" }
    termsPage: { en: "terms-conditions", fr: "conditions-generales" }
  };
</script>

<style>
  footer {
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

<footerclass="columns">
  <ul class="column col-4">
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href={lang === 'fr' ? '.' : `${lang}/confidentialite`}>
        {dict.privacy[lang]}
      </a>
    </li>
        <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href={lang === 'fr' ? '.' : `${lang}/termes`}>
        {dict.terms[lang]}
      </a>
    </li>
        <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href={lang === 'fr' ? '.' : `${lang}/mentions-legales`}>
       {dict.publisher[lang]}
      </a>
    </li>    
</footer>
