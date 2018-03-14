const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

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
    const movies = [{
        video: 'http://vt1.doubanio.com/201712282244/a97c1e7cd9025478b43ebc222bab892e/view/movie/M/302190491.mp4',
        doubanId: '26739551',
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2506258944.jpg',
        cover: 'https://img1.doubanio.com/img/trailer/medium/2493603388.jpg?'
      }]

    movies.forEach(async movie => {
        const { video, key, poster, cover } = movie

        if (video && !key) {
            try {
                console.log('开始上传 video')
                const videoData = await uploadToQiniu(video, `${nanoid()}.mp4`)
                console.log('开始上传 poster')
                const posterData = await uploadToQiniu(poster, `${nanoid()}.jpg`)
                console.log('开始上传 cover')
                const coverData = await uploadToQiniu(cover, `${nanoid()}.jpg`)

                if (videoData.key) {
                    movie.videoKey = videoData.key
                }

                if (posterData.key) {
                    movie.posterKey = posterData.key
                }

                if (coverData.key) {
                    movie.coverKey = coverData.key
                }

                console.log(movie)
            } catch (error) {
                console.error(error)
            }
        }
    })
})()