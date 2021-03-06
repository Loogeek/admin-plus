const { resolve } = require('path');
const puppeteer = require('puppeteer')

const url = 'https://movie.douban.com/tag/#/?sort=R&range=6,10&tags='

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

;(async () => {
    console.info('Start visit the target page')

    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })
    await sleep(3000)
    await page.waitForSelector('.more')

    for (let i = 0; i < 1; i++) {
        await sleep(3000)
        await page.click('.more')
    }

    const result = await page.evaluate(() => {
        const $ = window.$
        const items = $('.list-wp a')
        let links = []

        if (items.length) {
            items.each((index, item) => {
                const it = $(item)
                const doubanId = it.find('div').data('id')
                const title = it.find('.title').text()
                const rate = Number(it.find('.rate').text())
                const poster = it.find('img').attr('src').replace('s_ratio', 'l-ratio')

                links.push({
                    doubanId,
                    title,
                    rate,
                    poster
                })
            })
        }

        return links
    })

    browser.close()

    process.send({result})
    process.exit(0)
})()