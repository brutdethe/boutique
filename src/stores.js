import {
    writable,
    readable
} from 'svelte/store'

const ghDataRepo = process.env.GITHUB_DATA_REPO
const productsPath = `https://raw.githubusercontent.com/${ghDataRepo}/main/produits.json`
const categoriesPath = `https://raw.githubusercontent.com/${ghDataRepo}/main/categories.json`
let storedBasket = []
let storedCurrency = 'EUR'
let storedCountry = 'france'

if (process.browser) {
    storedBasket = JSON.parse(localStorage.getItem('basket')) || storedBasket
    storedCurrency = JSON.parse(localStorage.getItem('currency')) || storedCurrency
    storedCountry = JSON.parse(localStorage.getItem('country')) || storedCountry
}

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
    if (!id) return
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
    try {
        const response = await fetch(productsPath)

        if (response.ok) {
            const products = await response.json()
            const productsWithUSD = products.map(product => {
                product.prix = {
                    EUR: Math.ceil(product.prix),
                    USD: Math.ceil(product.prix * rate)
                }
                return product
            })
            set({
                products: productsWithUSD,
                categories: getCategoriesInStock(products),
                product: getProduct(products, id)
            })
        } else {
            const text = response.text()
            throw new Error(text)
        }

    } catch (error) {
        console.warn('Fetch Error products in stores')
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
    try {
        const response = await fetch(categoriesPath)

        if (response.ok) {
            const categories = await response.json()
            set(categories)
        } else {
            const text = response.text()
            throw new Error(text)
        }

    } catch (error) {
        console.warn('Fetch Error categories in stores')
    }

    return () => {}
}