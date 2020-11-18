import { writable, readable } from 'svelte/store';

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
            set({ products: products, category: "cat" });
        } else {
            const text = response.text();
            throw new Error(text);
        }

    } catch (error) {
        throw new Error(error);
    }

    return () => { };
}

