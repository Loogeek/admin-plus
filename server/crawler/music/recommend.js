const puppeteer = require('puppeteer')
const { sleep } = require('../../utils/misc')

const url = 'https://m.y.qq.com/'

;(async () => {
    console.info('Start visit the target page')

    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    })
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1')
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })
    await sleep(3000)

    page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
          console.log(`${i}: ${msg.args()[i]}`);
      });

    const result = await page.evaluate(() => {
        const slider = document.querySelector('#slider')
        let sliderList = slider.querySelectorAll('.ui-slider-item')
        sliderList = [...sliderList]
        let links = []
        console.log(sliderList.length)
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