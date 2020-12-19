import Stripe from 'stripe'
import fs from 'fs'

const stripe = new Stripe('sk_test_51HEFz3GJpQWhfcWwkbkeaZ9zrgTFZHnlsyOfXY2neWGkI3eTa79xAgHVqnvAeVXiMGo86ibca9TyN8t0YQGTVJOH005du8IAAg')

async function createProduct(product) {
    const url = 'https://shop.xn--brutdeth-i1a.fr'
    await stripe.products.create({
        id: product.id,
        type: 'good',
        attributes: ["name"],
        metadata: {
            category: product.catégorie
        },
        package_dimensions: {
            length: 0,
            width: 0,
            height: 0,
            weight: product.poids,
        },
        name: product.titre.fr,
        description: product.description.fr,
        images: product.photos.map(photo => `${url}/produits/${photo}`),
        url: `https://shop.xn--brutdeth-i1a.fr/produit-${product.id}`
    })
    await stripe.prices.create({
        currency: "eur",
        product: product.id,
        unit_amount: product.prix * 100
    })
}

export default createProduct

fs.readFile('./static/produits.json', (err, content) => {
    const products = JSON.parse(content)
    products.map(product => createProduct(product))
})