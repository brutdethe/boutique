import Stripe from 'stripe'
import fs from 'fs'

const produitsFilepath = './static/produits.json'

let produits = JSON.parse(fs.readFileSync(produitsFilepath));

export async function post(req, res) {
    res.setHeader('Content-Type', 'application/json')
    const {
        session_id
    } = req.body;

    const stripeSecret = process.env['stripe_secret']
    const stripe = new Stripe(stripeSecret)

    const session = await stripe.checkout.sessions.listLineItems(session_id)

    const basket = await Promise.all(session.data.map(async item => {
        const product = await stripe.products.retrieve(item.price.product)
        const productId = product.metadata.item_id
        return {
            id: productId,
            qty: item.quantity
        }
    }))

    basket.forEach((item, index) => produits.forEach(produit => {
        if (produit.id === item.id) {
            produits[index].stock -= item.qty
        }
    }))

    fs.writeFileSync(produitsFilepath, JSON.stringify(produits, null, 4))

    return res.end(JSON.stringify({
        status: "ok"
    }))
}