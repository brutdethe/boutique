import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

const stripeSecret = process.env['stripe_secret']
const stripe = new Stripe(stripeSecret)

async function session() {
    return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
            allowed_countries: ['FR', 'ES']
        },
        line_items: [{
            price_data: {
                currency: 'eur',
                product_data: {
                    name: 'Théière',
                },
                unit_amount: 2000,
            },
            quantity: 1,
        }, {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: 'Gaiwan',
                },
                unit_amount: 14300,
            },
            quantity: 2,
        }, ],
        mode: 'payment',
        success_url: 'https://fast-castle-84215.herokuapp.com/stripe-back',
        cancel_url: 'https://fast-castle-84215.herokuapp.com/stripe-back',
    });
}

session().then(session => {
    console.log("session.id", session)

})