import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51HEFz3GJpQWhfcWwkbkeaZ9zrgTFZHnlsyOfXY2neWGkI3eTa79xAgHVqnvAeVXiMGo86ibca9TyN8t0YQGTVJOH005du8IAAg')

async function createProducts() {
    await stripe.products.create({
        id: "ga21",
        type: 'good',
        attributes: {},
        package_dimensions: {
            length: 0,
            width: 0,
            height: 0,
            weight: 0.3,
        },
        name: "Gaiwan 10 cl",
        description: "Ce gaïwan est recouvert d'un émail à base de cendre, ce qui lui donne cette aspect assez vivant.",
        images: [
            "https://shop.xn--brutdeth-i1a.fr/produits/gaiwan-10cl_21-a.jpg",
            "https://shop.xn--brutdeth-i1a.fr/produits/gaiwan-10cl_21-b.jpg",
            "https://shop.xn--brutdeth-i1a.fr/produits/gaiwan-10cl_21-c.jpg",
            "https://shop.xn--brutdeth-i1a.fr/produits/gaiwan-10cl_21-d.jpg"
        ],
        url: "https://shop.xn--brutdeth-i1a.fr//produit-ga21"
    })
    await stripe.prices.create({
        currency: "eur",
        product: "ga21",
        unit_amount: 5400,
    })
}

export default createProducts