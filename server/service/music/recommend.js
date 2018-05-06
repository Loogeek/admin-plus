const mongoose = require('mongoose')
const Recommend = mongoose.model('Recommend')

export const getRecommendSlider = async () => {
    const sliderList = await Recommend.findOne({
        name: 'recommend'
    }, {
        slider: 1,
        _id: 0
    }, async (err, slider) => {
        if (err) {
            console.error(err)
        } else {
            return slider
        }
    })

    return sliderList
}