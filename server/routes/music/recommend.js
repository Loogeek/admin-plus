const { 
    controller, 
    get 
} = require('../../lib/decorator')
const { 
    getRecommendSlider 
} = require('../../service/music/recommend')

@controller('/api/v1/music')
export class musicController {
    @get('/slider')
    async getRecommendSlider(ctx, next) {
        const { slider } = await getRecommendSlider()

        ctx.body = {
            data: {
                slider
            },
            success: true,
            mes: '',
            code: 0
        }
    }
}