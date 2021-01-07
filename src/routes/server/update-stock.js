import Stripe from 'stripe'
import fs from 'fs'

const produitsFilepath = './static/produits.json'
const logsFilepath = './static/log-sales.json'

const logs = JSON.parse(fs.readFileSync(logsFilepath));
const produits = JSON.parse(fs.readFileSync(produitsFilepath));

export async function post(req, res) {
    res.setHeader('Content-Type', 'application/json')
    const {
        session_id
    } = req.body;

    if (logs.includes(session_id)) {
        console.log('Stripe session already saved')

        return
    }

    const stripeSecret = process.env['stripe_secret']
    const stripe = new Stripe(stripeSecret)
    let session

    try {
        session = await stripe.checkout.sessions.listLineItems(session_id)
    } catch {
        console.log('No such checkout stripe session')

        return
    }

    const basket = await Promise.all(session.data.map(async item => {
        const product = await stripe.products.retrieve(item.price.product)
        const productId = product.metadata.item_id
        return {
            id: productId,
            qty: item.quantity
        }
    }))

    basket.forEach(item => produits.forEach((produit, index) => {
        if (produit.id === item.id) {
            produits[index].stock -= item.qty
        }
    }))

    fs.writeFileSync(produitsFilepath, JSON.stringify(produits, null, 4))
    fs.writeFileSync(logsFilepath, JSON.stringify([...logs, session_id], null, 4))

    return res.end(JSON.stringify({
        status: "ok"
    }))
}