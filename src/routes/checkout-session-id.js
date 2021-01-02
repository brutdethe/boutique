import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

const lineItems = []
const checkoutData = {
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    locale: 'fr',
    shipping_address_collection: {
        allowed_countries: ['FR', 'ES']
    },
    line_items: [],
    mode: 'payment',
    success_url: 'https://fast-castle-84215.herokuapp.com/panier-ok',
    cancel_url: 'https://fast-castle-84215.herokuapp.com/panier-annule'
}

export async function post(req, res) {
    res.setHeader('Content-Type', 'application/json')
    const items = req.body.basket;
    const stripeSecret = process.env['stripe_secret']
    const stripe = new Stripe(stripeSecret)

    async function session() {
        checkoutData.line_items = items.map(item => {
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.titre[req.body.language],
                    },
                    unit_amount: item.prix * 100,
                },
                quantity: item.qty,
            };
        });
        return stripe.checkout.sessions.create(checkoutData);
    }

    session().then(session => {
        return res.end(JSON.stringify({
            session: {
                id: session.id
            }
        }))
    })
}