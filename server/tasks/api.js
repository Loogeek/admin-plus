const axios = require('axios')
const mongoose = require('mongoose')

async function fetchMovie(params) {
    const url = `http://api.douban.com/v2/movie/${item.doubanId}`
    let res = await axios(url);

    try {
        res = JSON.parse(res)
    } catch (err) {
        console.error(err)
        res = null
    }

    return res
}

