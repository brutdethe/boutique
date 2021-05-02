import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';

const {
    PORT,
    NODE_ENV
} = process.env;
const dev = NODE_ENV === 'development';
const defaultLocale = "fr";
const locales = ["fr", "en"]

/**
 * Safely extracts a locale out of the url.
 * 
 * @param {string} route - An url path
 */
function localRouteRegexp(route) {
    let localeString = locales.join("|");
    let regexp = new RegExp(`\/(${localeString})(\/|$)`, "gm");
    let currLocale = route.match(regexp);
    if (!currLocale) {
        return defaultLocale;
    }
    currLocale = currLocale[0].replace(/\//g, "");
    return currLocale || defaultLocale;
}

/**
 * Creates the express valid path regex
 * to allow matching the app on different
 * routes.
 * 
 * @param {Array<String>} locales - A list of supported locales
 */
function expressLocaleRouteRegex(locales) {
    let regexp = "(";
    locales.forEach((locale, i) => {
        regexp += `/${locale}`;
        if (i !== locales.length - 1) {
            regexp += "|"
        }
    })

    regexp += ")?";
    return regexp;
}

/**
 * A middleware to add the current
 * locale to the svelte session store.
 */
const bindSessionToRequest = (req, res, next) => sapper.middleware({
    session: () => ({
        locale: req.locale
    })
})(req, res, next)

/**
 * Finds the current locale in
 * the url path and sets it to the
 * request object.
 */
polka().use((req, _, next) => {
    let locale = localRouteRegexp(req.url);
    req.locale = locale;
    next();
})

/*
polka().use(
    expressLocaleRouteRegex(locales),
)
*/

polka() // You can also use Express
    .use(
        compression({
            threshold: 0
        }),
        sirv('static', {
            dev
        }),
        bodyParser.urlencoded({
            extended: false
        }),
        bodyParser.json(),
        bindSessionToRequest,
    )
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });