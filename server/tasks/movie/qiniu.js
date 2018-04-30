const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../../config')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

const { bucket, AK, SK } = config.qiniu
const mac = new qiniu.auth.digest.Mac(AK, SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async(url, key) => {
    return new Promise((resolve, reject) => {
        client.fetch(url, bucket, key, (err, ret, info) => {
            if (err) {
                reject(err)
            } else {
                if (info.statusCode === 200) {
                    resolve({ key })
                } else {
                    reject(info)
                }
            }
        })
    })
}

(async () => {
    const movies = await Movie.find({
        $or: [
            { videoKey: { $exists: false} },
            { videoKey: null},
            { videoKey: '' }
        ]
    })

    movies.forEach(async movie => {
        const { video, videoKey, poster, cover } = movie

        if (video && !videoKey) {
            try {
                console.log('开始上传 video')
                const videoData = await uploadToQiniu(video, `${nanoid()}.mp4`)
                console.log('开始上传 poster')
                const posterData = await uploadToQiniu(poster, `${nanoid()}.png`)
                console.log('开始上传 cover')
                const coverData = await uploadToQiniu(cover, `${nanoid()}.png`)

                if (videoData.key) {
                    movie.videoKey = videoData.key
                }

                if (posterData.key) {
                    movie.posterKey = posterData.key
                }

                if (coverData.key) {
                    movie.coverKey = coverData.key
                }

                await movie.save()
            } catch (error) {
                console.error(error)
            }
        }
    })
})()