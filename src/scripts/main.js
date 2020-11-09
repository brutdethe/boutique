'use strict'

function displayProducts(products, tag) {
    products.map(product => {
        tag.innerHTML = product.titre
    })
}

window.addEventListener("DOMContentLoaded", (event) => {

    fetch('./produits.json')
        .then(json => json.json())
        .then(produits => {
            const container = document.querySelector('.container')
            displayProducts(produits, container)
        })
})