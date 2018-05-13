const { 
    controller, 
    get 
} = require('../../lib/decorator')
const { 
    getRecommendSlider,
    getRecommendList,
} = require('../../service/music/recommend')

@controller('/api/v1/music')
export class musicController {
    @get('/slider')
    async getRecommendSlider(ctx, next) {
        const { slider } = await getRecommendSlider()

        ctx.body = {
            slider,
            success: true,
            mes: '',
            code: 0
        }
    }

    @get('/recommendList')
    async getRecommendList(ctx, next) {
        const { recommendList } = await getRecommendList()

        ctx.body = {
            recommendList,
            success: true,
            mes: '',
            code: 0
        }
    }
}