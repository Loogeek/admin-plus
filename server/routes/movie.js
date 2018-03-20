const { controller, get } = require('../lib/decorator')
const { getAllMovies, getMovieDetail, getRelativeMovies } = require('../service/movie')

@controller('/api/v1/movies')
export class movieController {
    @get('/')
    async getAllMovies(ctx, next) {
        const { type, year } = ctx.query
        const movies = await getAllMovies(type, year)

        ctx.body = {
            data: {
                movies
            },
            success: true,
            mes: '',
            code: 0
        }
    }

    @get('/:id')
    async getMoiveDetail(ctx, next) {
        const { id } = ctx.params
        const movie = await this.getMoiveDetail(id)
        const relativeMovies = await getRelativeMovies(movie)

        ctx.body = {
            data: {
                movie,
                relativeMovies
            },
            success: true,
            mes: '',
            code: 0
        }
    }
}