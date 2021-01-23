const fs = require('fs')
const Path = require('path');
const sharp = require('sharp');

const resizeTo = {
    thumbs: {
        width: 446,
        height: 297
    },
    carousels: {
        width: 1374,
        height: 916
    }
}

function getExistentPaths() {
    const checkPaths = (paths) => Object.values(paths).forEach(path => {
        if (!fs.existsSync(path)) {
            throw `Non-existent directory ${path}`
        }
    })

    const path = {
        'www': './static/',
        'photos': './photos',
    }
    path.thumbs = Path.join(path.www, 'images/thumbs')
    path.carousels = Path.join(path.www, 'images/carousels')

    checkPaths(path)

    return path
}

function deleteFiles(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, index) => {
            const curPath = Path.join(directoryPath, file)
            if (fs.lstatSync(curPath).isFile()) {
                fs.unlinkSync(curPath)
            }
        })
    }
}

function convert(path, resizeTo) {
    sharp(path.source)
        .resize(resizeTo.width, resizeTo.height)
        .toFile(path.target, (error, info) => {
            if (error) {
                console.log('error', `${error.message} - file: ${path.source}`)
            }
            console.log('optimize:', path.target)
        });
}

const path = getExistentPaths()

const productsFile = fs.readFileSync(Path.join(path.www, 'produits.json'))
const products = JSON.parse(productsFile)
const allPhotos = products.map(products => products.photos).filter(photos => photos.length)

deleteFiles(path.thumbs)
deleteFiles(path.carousels)

allPhotos.forEach((productPhotos) => {
    productPhotos.forEach((photo, index) => {
        const source = Path.join(path.photos, photo)
        const carouselPath = {
                source: source,
                target: Path.join(path.carousels, photo)
            }
            // creates thumbs
        if (index === 0) {
            const thumbPaths = {
                source: source,
                target: Path.join(path.thumbs, photo)
            }
            convert(thumbPaths, resizeTo.thumbs)
        }

        convert(carouselPath, resizeTo.carousels)
    })
})