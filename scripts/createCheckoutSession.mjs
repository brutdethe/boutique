import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

const stripeSecret = process.env['stripe_secret']
const stripe = new Stripe(stripeSecret)

async function session() {
    return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'T-shirt',
                },
                unit_amount: 2000,
            },
            quantity: 1,
        }, ],
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
    });
}

session().then(session => {
    console.log("session.id", session)

})