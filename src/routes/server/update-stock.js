import fetch from 'node-fetch'
import Stripe from 'stripe'
import 'dotenv/config'

async function getPaidsSessionsIds(stripe) {
    const checkoutSessions = await stripe.checkout.sessions.list()
    return checkoutSessions.data.filter(session => session.payment_status === 'paid').map(session => session.id)
}

async function getSessionsItems(stripe, sessionIds) {
    return Promise.all(sessionIds.map(sessionId => stripe.checkout.sessions.listLineItems(sessionId)))
}

function getItems(sessionsItems) {
    return sessionsItems
        .map(items => items.data)
        .flat()
        .filter(item => item.description.match(/id:.*$/))
        .map(item => ({
            id: item.description.match(/id:(.*)$/)[1],
            quantity: item.quantity
        }))
}

function getItemsGroupBy(items) {
    const counts = items.reduce((prev, curr) => {
        let count = prev.get(curr.id) || 0
        prev.set(curr.id, +curr.quantity + count)
        return prev
    }, new Map())

    return [...counts].map(([id, quantity]) => ({
        id,
        quantity
    }))
}

function updatesStock(productsJSON, productsSession) {
    let productsUpdated = productsJSON

    productsUpdated = productsUpdated.map(product => {
        product.stock = product['quantité_produite']
        return product
    })

    productsSession.forEach(item => {
        productsUpdated = productsUpdated.map(product => {
            if (item.id === product.id) {
                product.stock -= item.quantity
            }
            return product
        })
    })

    return productsUpdated
}

export async function post(req, res) {
    res.setHeader('Content-Type', 'application/json')

    const ghDataRepo = process.env.github_data_repo
    const productsPath = `https://raw.githubusercontent.com/${ghDataRepo}/main/produits.json`
    const stripeKeySk = process.env['stripe_sk']
    const stripe = new Stripe(stripeKeySk)

    try {
        const paidsSessionsIds = await getPaidsSessionsIds(stripe)
        const sessionsItems = await getSessionsItems(stripe, paidsSessionsIds)
        const items = getItems(sessionsItems)
        const itemsGroupBy = getItemsGroupBy(items)

        const productsJSON = await fetch(productsPath).then(result => result.json())
        const productsUpdated = updatesStock(productsJSON, itemsGroupBy)

        return res.end(JSON.stringify(productsUpdated))
    } catch (err) {
        console.log('No such checkout stripe session', err)

        return res.end(JSON.stringify({
            err: err
        }))
    }
}