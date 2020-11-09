const main = document.querySelector('main')

function displayProducts(products) {
    console.log('produits', products)
}

window.addEventListener("DOMContentLoaded", (event) => {
    fetch('./produits.json')
        .then(json => json.json())
        .then(produits => displayProducts(produits))
})