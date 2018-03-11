const axios = require('axios')
const mongoose = require('mongoose')

async function fetchMovie(params) {
    const url = `http://api.douban.com/v2/movie/${params.doubanId}`
    let res = await axios(url);
    try {
        res = res.data
    } catch (err) {
        console.error(err)
        res = null
    }

    return res
}

;(async () => {
    const movies = [
        {
            doubanId: 3914513,
            title: '马戏之王',
            rate: 7.3,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2497576479.jpg'
          },
          {
            doubanId: 27593529,
            title: '绅士联盟',
            rate: 9.3,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2508069159.jpg'
          }
    ]

    movies.forEach(async movie => {
        const movieData = await fetchMovie(movie)

        console.log(movieData)
    })
})()

