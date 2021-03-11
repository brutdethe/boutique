<script>
    import {goto, stores} from "@sapper/app";
    import {pagesPath} from "../stores.js";

    const {page} = stores();

    $: lang = !!$page.path.match("^/en/") ? "en" : "fr";

    function changeLanguageSelected(evt) {
        lang = evt.currentTarget.value;

        if ($page.path === "/" && lang !== "fr") {
            goto(`${lang}/`);
        } else if ($page.path === "/en/" && lang !== "en") {
            goto(`/`);
        } else if (
            $page.path.includes($pagesPath["product"].en) ||
            $page.path.includes($pagesPath["product"].fr)
        ) {
            const refProduct = $page.path.match(/[-].*/);
            goto(`${$pagesPath["product"][lang]}${refProduct}`);
        } else {
            const pagePath = Object.keys($pagesPath).filter(
                title =>
                    $pagesPath[title].en === $page.path ||
                    $pagesPath[title].fr === $page.path
            )[0];
            goto($pagesPath[pagePath][lang]);
        }
        return;
    }
</script>

<style>
    .language {
        flex-wrap: nowrap;
        justify-content: flex-end;
        line-height: 4em;
    }

    @media (max-width: 600px) {
        .language {
            padding-left: 10px !important;
        }
    }
</style>

<div class="language column col-7">
    <button
            class="btn btn-sm {'fr' === lang ? 'bg-secondary' : ''}"
            on:click={changeLanguageSelected}
            value="fr">
        FR
    </button>
    <button
            class="btn btn-sm {'en' === lang ? 'bg-secondary' : ''}"
            on:click={changeLanguageSelected}
            value="en">
        US
    </button>
</div>
