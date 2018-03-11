const puppeteer = require('puppeteer')
const base = 'https://movie.douban.com/subject/'
const trailerBase = 'https://movie.douban.com/trailer/'

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

process.on('message', async (movies) => {
    console.log('Start visit the target page')
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    })
    const page = await browser.newPage()
    
    for (let i = 0; i < movies.length; i++) {
        const doubanId = movies[i].doubanId

        await page.goto(base + doubanId, {
            waitUntil: 'networkidle2'
        })
        await sleep(1000)

        const result = await page.evaluate(() => {
            const $ = window.$
            const it = $('.related-pic-video')

            if (it && it.length > 0) {
                const link = it.attr('href')
                const cover = it.find('img').attr('src')

                return {
                    link,
                    cover
                }
            }

            return {}
        })

        let video = ''

        if (result.link) {
            await page.goto(result.link, {
                waitUntil: 'networkidle2'
            })
            await sleep(1000)

            video = await page.evaluate(() => {
                const $ = window.$
                const it = $('source')

                return it && it.length > 0 ? it.attr('src') : '' 
            })
        }

        const data = {
            video,
            doubanId,
            cover: result.cover
        }
        console.log(11, data)
        process.send(data)
    }

    browser.close()
    process.exit(0)
})