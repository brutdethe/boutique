import {
    writable,
    readable
} from 'svelte/store'

const ghDataRepo = process.env.GITHUB_DATA_REPO
const categoriesPath = `https://raw.githubusercontent.com/${ghDataRepo}/main/categories.json`
const pages = {
    index: {
        en: '/en/',
        fr: '/'
    },
    basket: {
        en: '/en/basket',
        fr: '/fr/panier'
    },
    basketSuccess: {
        en: '/en/basket-success',
        fr: '/fr/panier-ok'
    },
    "product": {
        en: '/en/product',
        fr: '/fr/produit'
    },
    about: {
        en: 'https://www.theiere-tasse.com/my-work/',
        fr: 'https://www.theiere-tasse.com/'
    },
    publisher: {
        en: '/en/publisher',
        fr: '/fr/mentions-legales'
    },
    privacy: {
        en: '/en/privacy',
        fr: '/fr/confidentialite'
    },
}
let storedBasket = []
let storedCurrency = 'EUR'
let storedCountry = 'france'

if (process.browser) {
    storedBasket = JSON.parse(localStorage.getItem('basket')) || storedBasket
    storedCurrency = JSON.parse(localStorage.getItem('currency')) || storedCurrency
    storedCountry = JSON.parse(localStorage.getItem('country')) || storedCountry
}

export const pagesPath = writable(pages)
export const currency = writable(storedCurrency)
export const country = writable(storedCountry)
export const rate = writable(1.28)
export const categorySelected = writable('Théière')
export const basket = writable(storedBasket)
export const stripeKeySk = writable(process.env.STRIPE_PK)
export const githubDataRepo = writable(ghDataRepo)

basket.subscribe(values => {
    if (process.browser) {
        localStorage.setItem('basket', JSON.stringify(values))
    }
});

currency.subscribe(value => {
    if (process.browser) {
        localStorage.setItem('currency', JSON.stringify(value))
    }
});

country.subscribe(value => {
    if (process.browser) {
        localStorage.setItem('country', JSON.stringify(value))
    }
});


function getCategoriesInStock(products) {
    function getCategories(products) {
        const categories = new Set(products.map(product => product.catégorie))

        return [...categories]
    }

    return getCategories(products)
        .filter(category => products
            .filter(product => product.catégorie === category)
            .reduce((acc, cur) => {
                if (cur.stock > 0) {
                    return true
                } else {
                    return (acc === true) && true
                }
            }) === true
        )
}

function getProduct(products, id) {
    return products.filter(product => product.id === id)[0]
}

export function loadProducts(id = null, rate) {
    let products = readable([], set => {
        fetchProducts(set, id, rate)
        return () => {}
    })

    return products
}

async function fetchProducts(set, id, rate) {

    if (typeof fetch !== 'function') {
        return () => {}
    }
    const response = await
    fetch("/server/update-stock", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const products = await response.json()
        const productsWithUSD = products.map(product => {
            product.prix = {
                EUR: Math.ceil(product.prix),
                USD: Math.ceil(product.prix * rate)
            }
            return product
        })
        if (!id) {
            set({
                products: productsWithUSD,
                categories: getCategoriesInStock(products),
                product: getProduct(products, id)
            })
        } else {
            set(getProduct(products, id))
        }

    } else {
        const text = response.text()
        throw new Error(text)
    }

    return () => {}
}

export function loadCategories() {
    let categories = readable([], set => {
        fetchCategories(set)
        return () => {}
    })

    return categories
}

async function fetchCategories(set) {

    if (typeof fetch !== 'function') {
        return () => {}
    }

    const response = await fetch(categoriesPath)

    if (response.ok) {
        const categories = await response.json()
        set(categories)
    } else {
        const text = response.text()
        throw new Error(text)
    }

    return () => {}
}