import { writable, readable } from 'svelte/store';

function getCategories(products) {
    const categories = new Set(products.map(product => product.catégorie))

    return [...categories]
}


export const languageSelected = writable('fr');
export const categorySelected = writable('Gaiwan');


export function loadProducts() {
    let products = readable([], set => {
        fetchProducts(set)
        return () => { }
    });

    return products;
}

async function fetchProducts(set) {
    try {
        const response = await fetch('./produits.json');

        if (response.ok) {
            const products = await response.json();
            const unsubscribe = languageSelected.subscribe(value => {
                console.log('value is:', value);
            });
            unsubscribe();
            set({ products: products, categories: getCategories(products) });
            throw new Error();
        } else {
            const text = response.text();
            throw new Error(text);
        }

    } catch (error) {
        console.warn('Fetch error in stores');
    }

    return () => { };
}
