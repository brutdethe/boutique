import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

const checkoutData = {
    payment_method_types: ['card', 'sepa_debit'],
    billing_address_collection: 'auto',
    locale: '',
    shipping_address_collection: {
        allowed_countries: ['FR', 'ES']
    },
    line_items: [],
    mode: 'payment',
    success_url: 'http://shop.brutdethé.fr/panier-ok',
    cancel_url: 'http://shop.brutdethé.fr/panier-annule'
}

const dict = {
    shipping: {
        en: "Shipping costs",
        fr: "Frais de transport"
    },
}

export async function post(req, res) {
    res.setHeader('Content-Type', 'application/json')
    const {
        basket,
        language,
        shipping
    } = req.body;
    console.log('stripe_secret', process.env['stripe_secret'].length)
    const stripeSecret = process.env['stripe_secret']
    const stripe = new Stripe(stripeSecret)

    async function session() {
        checkoutData.locale = language
        checkoutData.line_items = basket.map(item => {
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.titre[language],
                    },
                    unit_amount: item.prix * 100,
                },
                quantity: item.qty,
            };
        });
        checkoutData.line_items[checkoutData.line_items.length] = {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: dict.shipping[language],
                },
                unit_amount: shipping * 100,
            },
            quantity: 1,
        }
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