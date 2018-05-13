const mongoose = require('mongoose')
const Recommend = mongoose.model('Recommend')

export const getRecommendSlider = async () => {
    await Recommend.findOne({
        name: 'recommend'
    }, {
        slider: 1,
        _id: 0
    })
    // .populate({
    //     options: { limit: 5}
    // })
    .exec(async (err, slider) => {
        if (err) {
            console.error(err)
        } else {
            console.log(111, slider)
            return slider
        }
    })
}

export const getRecommendList = async () => {
    await Recommend.findOne({
        name: 'recommend'
    }, {
        recommendList: 1,
        _id: 0
    })
    .exec(async (err, recommendList) => {
        if (err) {
            console.error(err)
        } else {
            return recommendList
        }
    })

}