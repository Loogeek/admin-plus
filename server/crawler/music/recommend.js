const puppeteer = require('puppeteer')
const { sleep } = require('../../utils/misc')

;(async () => {
    console.info('Start visit the target page')

    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    })
    let page = await browser.newPage()
    let url = 'https://y.qq.com/portal/playlist.html'

    await page.goto(url, {
        waitUntil: 'networkidle2'
    })

    page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
          console.log(`${i}: ${msg.args()[i]}`);
    });
    await sleep(2000)

    let result = {}

    result.recommendList = await page.evaluate(() => {
        const playlist = [...document.querySelectorAll('.playlist__item_box')]
        const recommendlist = playlist.map(play => {
            const playList = play.querySelector('.js_playlist')
            const dissid = playList.dataset.disstid
            const img = playList.querySelector('.playlist__pic')
            const imgurl = img.src
            const playTitle = play.querySelector('.playlist__title')
            const dissname = playTitle.querySelector('.js_playlist').innerHTML
            const author = play.querySelector('.playlist__author')
            const creator = {
                name: author.querySelector('.js_user').innerHTML
            }

            return {
                dissid,
                imgurl,
                dissname,
                creator
            }
        })
        return recommendlist
    })

    url = 'https://m.y.qq.com/'

    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1')
    
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })
    await sleep(2000)

    result.slider = await page.evaluate(() => {
        const slider = document.querySelector('#slider')
        let sliderList = slider.querySelectorAll('.ui-slider-item')
        sliderList = [...sliderList]
        let links = []
        if (sliderList.length) {
            sliderList.forEach(item => {
                const linkUrl = item.querySelector('a').href
                const picUrl = item.querySelector('img').src

                links.push({
                    linkUrl,
                    picUrl
                })
            })
        }

        return links
    })

    browser.close()

    process.send({result})
    process.exit(0)
})()