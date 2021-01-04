import {
    writable,
    readable
} from 'svelte/store'

let storedLanguage = 'fr'
let storedBasket = []

if (process.browser) {
    storedLanguage = localStorage.getItem('languageSelected') || 'fr'
    storedBasket = JSON.parse(localStorage.getItem('basket'))
}

export const languageSelected = writable(storedLanguage)
export const categorySelected = writable('Gaiwan')
export const basket = writable(storedBasket)

languageSelected.subscribe(value => {
    if (process.browser) {
        localStorage.setItem('languageSelected', value === 'en' ? 'en' : 'fr');
    }
});

basket.subscribe(values => {
    if (process.browser) {
        localStorage.setItem('basket', JSON.stringify(values))
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

export function loadProducts(id = null) {
    let products = readable([], set => {
        fetchProducts(set, id)
        return () => {}
    })

    return products
}

async function fetchProducts(set, id) {
    try {
        const response = await fetch('./produits.json')

        if (response.ok) {
            const products = await response.json()
            set({
                products: products,
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

export function loadCategories(id = null) {
    let categories = readable([], set => {
        fetchCategories(set)
        return () => {}
    })

    return categories
}

async function fetchCategories(set) {
    try {
        const response = await fetch('./categories.json')

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