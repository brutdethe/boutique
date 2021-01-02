export async function post(req, res) {
    res.setHeader('Content-Type', 'application/json')
    const data = req.body

    return res.end(JSON.stringify({
        session: {
            id: "cs_test_b1dBQH8DoQkyM0zpoXMKeOCqNY9AyUnUxEeCSXfJ7zMltWXOwyBYU4uKIW"
        }
    }))
}