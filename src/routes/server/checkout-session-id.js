import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

const checkoutData = {
    payment_method_types: ['card', 'sepa_debit'],
    billing_address_collection: 'required',
    locale: '',
    shipping_address_collection: {
        allowed_countries: ['FR', 'US']
    },
    line_items: [],
    mode: 'payment',
    success_url: '',
    cancel_url: ''
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

    const stripeSecret = process.env['stripe_secret']
    const stripe = new Stripe(stripeSecret)

    async function session() {
        checkoutData.locale = language
        checkoutData.success_url = `http://shop.xn--brutdeth-i1a.fr/${language}/panier-ok?session_id={CHECKOUT_SESSION_ID}`
        checkoutData.cancel_url = `http://shop.xn--brutdeth-i1a.fr/${language}/panier-annule`
        checkoutData.line_items = basket.map(item => {
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.titre[language],
                        description: item.id,
                        metadata: {
                            item_id: item.id
                        }
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