const axios = require('axios')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

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
    const movies = await Movie.find({
        $or: [
            { summary: { $exists: false }},
            { summary: null },
            { year: { $exists: false } },
            { title: '' },
            { summary: '' }
        ]
    })

    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i]
        const movieData = await fetchMovie(movie)

        if (movieData) {
            const { 
                tags = [], 
                summary = '', 
                alt_title = '', 
                title = '',
                attrs
            } = movieData

            movie.summary = summary
            movie.title = alt_title || title
            movie.rawTitle = title 

            if (attrs) {
                movie.movieTypes = attrs.movie_type || []
                movie.year = attrs.year[0] || 2018

                for (let i = 0; i < movie.movieTypes.length; i++) {
                    const item = movie.movieTypes[i]
                    let cat = await Category.findOne({
                        name: item
                    })

                    if (!cat) {
                        cat = new Category({
                            name: item,
                            movies: [movie._id]
                        })
                    } else {
                        if (cat.movies.indexOf(movie._id) === -1) {
                            cat.movies.push(movie._id)
                        }
                    }

                    await cat.save()

                    if (!movie.category || movie.category.indexOf(cat._id) === -1) {
                        movie.category.push(cat._id)
                    }

                    const { pubdate = [] } = movieData.attrs
                    let newPubdate = []

                    pubdate.forEach(item => {
                        if (item && item.split('(').length > 0) {
                            const parts = item.split('(')
                            const date = parts[0]
                            let country = '未知'

                            if (parts[1]) {
                                country = parts[1].split(')')[0]
                            }

                            newPubdate.push({
                                date: new Date(date),
                                country
                            })
                        }
                    })

                    movie.pubdate = newPubdate
                }
            }

            tags.forEach(tag => {
                movie.tags.push(tag.name)
            })

            await movie.save()
        }
    }
})()

