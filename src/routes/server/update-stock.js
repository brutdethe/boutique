import fs from 'fs'

const produitsFilepath = './static/produits.json'

let produits = JSON.parse(fs.readFileSync(produitsFilepath));

export async function post(req, res) {
    res.setHeader('Content-Type', 'application/json')
    const {
        basket
    } = req.body;

    basket.map(item => produits.forEach((produit, index) => {
        if (produit.id === item.id) {
            produits[index].stock = produits[index].stock - item.qty
        }
    }))

    fs.writeFileSync(produitsFilepath, JSON.stringify(produits));

    return res.end(JSON.stringify({
        status: "ok"
    }))
}