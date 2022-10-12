import fetch from 'node-fetch'
import 'dotenv/config'


function updatesStock(productsJSON) {
    let productsUpdated = productsJSON

    productsUpdated = productsUpdated.map(product => {
        product.stock = product['quantité_produite']
        return product
    })

    return productsUpdated
}

export async function post(req, res) {
    res.setHeader('Content-Type', 'application/json')

    const ghDataRepo = process.env.github_data_repo
    const productsPath = `https://raw.githubusercontent.com/${ghDataRepo}/main/produits.json`

    try {


        const productsJSON = await fetch(productsPath).then(result => result.json())
        updatesStock(productsJSON)

        return res.end(JSON.stringify(productsJSON))
    } catch (err) {
        console.log('No such checkout stripe session', err)

        return res.end(JSON.stringify({
            err: err
        }))
    }
}